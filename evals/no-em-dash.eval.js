import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const TRACKED_EXTS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.md', '.html', '.json'];
const EXCLUDES = [/^node_modules\//, /^dist\//, /^evals\/no-em-dash\.eval\.js$/];

function listFiles() {
    const raw = execSync('git ls-files', { encoding: 'utf8' });
    return raw
        .split(/\r?\n/)
        .filter(Boolean)
        .filter((p) => TRACKED_EXTS.some((ext) => p.endsWith(ext)))
        .filter((p) => !EXCLUDES.some((re) => re.test(p)));
}

export default async function run() {
    const offenders = [];
    for (const file of listFiles()) {
        let contents;
        try {
            contents = readFileSync(file, 'utf8');
        } catch {
            continue;
        }
        if (contents.includes('\u2014')) {
            const lines = contents.split('\n');
            lines.forEach((line, i) => {
                if (line.includes('\u2014')) {
                    offenders.push(`${file}:${i + 1}`);
                }
            });
        }
    }

    if (offenders.length > 0) {
        throw new Error(
            `em dash found in ${offenders.length} location(s):\n  ${offenders.slice(0, 10).join('\n  ')}${offenders.length > 10 ? `\n  ... and ${offenders.length - 10} more` : ''}`
        );
    }
}
