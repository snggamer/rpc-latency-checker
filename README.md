[![License] (https://img.shields.io/badge/license-MIT-green.svg)] (./LICENSE) [![Issues] (https://img.shields.io/github/issues/snggamer/rpc-latency-checker.svg)] (https://github.com/snggamer/rpc-latency-checker/issues) [![Stars] (https://img.shields.io/github/stars/snggamer/rpc-latency-checker.svg)] (https://github.com/snggamer/rpc-latency-checker/stargazers)
# RPC Latency Checker
Measure latency of multiple EVM RPC endpoints (multiple attempts), print a table and JSON.

Features
Simple JSON‑RPC probe (eth_blockNumber).

Aggregates avg/min/max over N attempts.

Outputs console table + JSON.

## Installation
Require Node.js v18+.

Install deps:
npm install
## Usage
Run:
npm run start
Edit targets in src/index.ts to add/remove RPC endpoints.

## Examples
Console table plus JSON block with stats per endpoint.

Roadmap
CLI flags: --tries, --timeout, --output csv

Load targets from file (YAML/JSON)

Better errors and retries

Contributing
Issues and PRs are welcome. Good first issues: add networks, CSV export, flags.

License
MIT
