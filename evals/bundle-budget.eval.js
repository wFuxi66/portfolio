import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const DIST_ASSETS = 'dist/assets';
const JS_BUDGET_BYTES = 150 * 1024;
const CSS_BUDGET_BYTES = 30 * 1024;

function walk(dir) {
    const out = [];
    if (!existsSync(dir)) return out;
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        const s = statSync(full);
        if (s.isDirectory()) {
            out.push(...walk(full));
        } else {
            out.push(full);
        }
    }
    return out;
}

function gzipSizeOf(file) {
    return gzipSync(readFileSync(file)).length;
}

export default async function run() {
    if (!existsSync(DIST_ASSETS)) {
        console.log('  (skipped: no dist/assets; run `npm run build` to activate)');
        return;
    }

    const files = walk(DIST_ASSETS);
    let jsBytes = 0;
    let cssBytes = 0;
    for (const file of files) {
        if (file.endsWith('.js')) jsBytes += gzipSizeOf(file);
        else if (file.endsWith('.css')) cssBytes += gzipSizeOf(file);
    }

    const problems = [];
    if (jsBytes > JS_BUDGET_BYTES) {
        problems.push(`JS gzipped = ${(jsBytes / 1024).toFixed(1)}kb > budget ${JS_BUDGET_BYTES / 1024}kb`);
    }
    if (cssBytes > CSS_BUDGET_BYTES) {
        problems.push(`CSS gzipped = ${(cssBytes / 1024).toFixed(1)}kb > budget ${CSS_BUDGET_BYTES / 1024}kb`);
    }

    if (problems.length > 0) {
        throw new Error(problems.join('; '));
    }

    console.log(`  (JS=${(jsBytes / 1024).toFixed(1)}kb, CSS=${(cssBytes / 1024).toFixed(1)}kb gzipped)`);
}
