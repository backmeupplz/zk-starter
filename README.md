# Zero-Knowledge starter

A zero-config zero-knowledge project starter. Just clone, install dependencies and start developing. Heavily inspired by [BigWhaleLabs/seal-cred-verifier-contract](https://github.com/BigWhaleLabs/seal-cred-verifier-contract). Features included:

- Test suits for both the circuits and the smart contracts
- Set of scripts to compile circuits and deploy smart contracts
- VSCode extensions list to streamline the development
- Linters for all the code you write
- One command to deploy an NPM package with smart contract typings for TypeScript
- Smart contracts are versioned by default
- Automatic Etherscan verification of deployed contracts

Features not included:

- Messing with config files instead of building circuits

## Usage

1. Clone the repository with `git clone git@github.com:backmeupplz/zk-starter.git`
2. Install the dependencies with `yarn`
3. Add environment variables to your `.env` file
4. Check out `yarn generate-inputs` script and modify it so that you get the correct inputs are generated for your circuits, then run `yarn generate-inputs`
5. Run `yarn compile` to compile the circom circuits, create proof, verify proof, export verifier as a solidity Verifier.sol
6. Run `yarn test` to run the test suits and make sure your circuits are robust
7. Use the artifacts from the `public` folder in [snarkjs](https://github.com/iden3/snarkjs)
8. Run `yarn deploy` to deploy the verifier smart contracts to blockchain
9. Run `yarn release` to publish an NPM package with typings that can later be used in any of your JS/TS projects

## Bonus

- Check out `scripts/compile-circuit.sh` for complete understanding of what's going on when compiling the circuits
- Feel free to increase/decrease tau factors in the `pot` folder as you number of constraints grows or shrinks

## Environment variables

| Name                         | Description                       |
| ---------------------------- | --------------------------------- |
| `ETHERSCAN_API_KEY`          | Etherscan API key                 |
| `ETH_RPC`                    | Ethereum RPC URL                  |
| `CONTRACT_OWNER_PRIVATE_KEY` | Private key of the contract owner |

Also check out the `.env.example` file for more information.

## Available scripts

- `yarn build` — compiles the contracts' ts interfaces to the `typechain` directory
- `yarn compile` - compiles the circom circuit, creates proof, verifies proof, exports verifier as a solidity file, exports artifacts to the `public` directory
- `yarn test` — runs the test suite
- `yarn deploy` — deploys the contract to the network
- `yarn eth-lint` — runs the linter for the solidity contracts
- `yarn lint` — runs all the linters
- `yarn prettify` — prettifies the code in th project
- `yarn release` — relases the `typechain` directory to NPM
