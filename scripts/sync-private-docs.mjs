import { copyFile, cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.resolve(process.env.PRIVATE_DOCS_SOURCE ?? path.join(repoRoot, '..', 'CMI-API'));
const targetRoot = path.join(repoRoot, 'project-docs');

if (!existsSync(path.join(sourceRoot, 'README.md')) || !existsSync(path.join(sourceRoot, 'docs'))) {
  throw new Error(`Private docs source not found at ${sourceRoot}. Set PRIVATE_DOCS_SOURCE=/path/to/CMI-API if needed.`);
}

await rm(targetRoot, { recursive: true, force: true });
await mkdir(targetRoot, { recursive: true });
await copyFile(path.join(sourceRoot, 'README.md'), path.join(targetRoot, 'README.md'));
await cp(path.join(sourceRoot, 'docs'), path.join(targetRoot, 'docs'), {
  recursive: true,
  filter: (source) => !source.endsWith('.DS_Store'),
});

let sourceCommit = 'unknown';
let sourceState = 'clean';
try {
  sourceCommit = execFileSync('git', ['-C', sourceRoot, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
  const status = execFileSync('git', ['-C', sourceRoot, 'status', '--porcelain'], { encoding: 'utf8' }).trim();
  if (status) {
    sourceState = 'local changes present at sync time';
  }
} catch {
  // Keep syncing even if the source folder is not a Git checkout.
}

await writeFile(
  path.join(targetRoot, 'SYNCED_FROM.md'),
  `# Synced Source\n\nThis folder is a public documentation-only copy of selected files from the private \`mrfdev/1MB-CMIAPI\` repository.\n\n- Source path: \`${sourceRoot}\`\n- Source commit: \`${sourceCommit}\`\n- Source state: \`${sourceState}\`\n- Copied files: \`README.md\` and \`docs/\`\n- Excluded on purpose: source code, jars, servers, databases, task logs, and internal checklists\n\nRun \`npm run docs:sync\` from this repository to refresh the public copy and regenerate the Starlight pages.\n`,
);

console.log(`Synced README.md and docs/ from ${sourceRoot} (${sourceCommit}) into ${targetRoot}`);
