#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const result = spawnSync('npx', ['playwright', 'test'], {
    stdio: 'inherit',
    shell: true,
});

if (result.status !== 0) {
    process.exit(result.status ?? 1);
}
