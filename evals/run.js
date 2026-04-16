#!/usr/bin/env node
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import process from 'node:process';

const here = dirname(fileURLToPath(import.meta.url));
const evals = readdirSync(here)
    .filter((name) => name.endsWith('.eval.js'))
    .sort();

if (evals.length === 0) {
    console.log('no evals to run');
    process.exit(0);
}

let failed = 0;

for (const name of evals) {
    const url = pathToFileURL(join(here, name)).href;
    try {
        const mod = await import(url);
        const run = mod.default ?? mod.run;
        if (typeof run !== 'function') {
            throw new Error(`${name}: expected default export or named "run" function`);
        }
        await run();
        console.log(`PASS  ${name}`);
    } catch (error) {
        failed += 1;
        console.error(`FAIL  ${name}: ${error.message}`);
    }
}

if (failed > 0) {
    console.error(`\n${failed} eval(s) failed`);
    process.exit(1);
}

console.log(`\n${evals.length} eval(s) passed`);
