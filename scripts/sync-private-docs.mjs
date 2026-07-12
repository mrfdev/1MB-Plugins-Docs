#!/usr/bin/env node

// Compatibility entry point for older local instructions. The namespace-safe
// importer defaults to the registered cmi-api source and honors PRIVATE_DOCS_SOURCE.
await import('./sync-docs.mjs');
