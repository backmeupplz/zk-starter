#!/bin/sh
set -e

# Util function for logging
starEcho () {
  echo "**** $1 ****"
}

# Compile the circuit
starEcho "COMPILING CIRCUIT"
circom "circuits/$1.circom" --r1cs --wasm --sym --c -o build

# Generate witness
starEcho "GENERATING WITNESS FOR SAMPLE INPUT"
node "build/$1_js/generate_witness.js" "build/$1_js/$1.wasm" "inputs/input-$2.json" "build/witness-$2.wtns"

# Generate zkey 0000
starEcho "GENERATING ZKEY 0000"
yarn snarkjs groth16 setup "build/$1.r1cs" pot/pot16_final.ptau "pot/$1_0000.zkey"

# Apply random beacon as before
starEcho "GENERATING FINAL ZKEY"
yarn snarkjs zkey beacon "pot/$1_0000.zkey" "pot/$1_final.zkey" \
  0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

# Optional: verify final zkey
starEcho "VERIFYING FINAL ZKEY"
yarn snarkjs zkey verify "build/$1.r1cs" pot/pot16_final.ptau "pot/$1_final.zkey"

# Export verification key
starEcho "Exporting vkey"
yarn snarkjs zkey export verificationkey "pot/$1_final.zkey" "pot/$1_verification_key.json"

# Create the proof
starEcho "CREATING PROOF FOR SAMPLE INPUT"
yarn snarkjs groth16 prove "pot/$1_final.zkey" "build/witness-$2.wtns" \
  "build/proof-$2.json" "build/public-$2.json"

# Verify the proof
starEcho "VERIFYING PROOF FOR SAMPLE INPUT"
yarn snarkjs groth16 verify "pot/$1_verification_key.json" "build/public-$2.json" "build/proof-$2.json"

# Export the verifier as a smart contract
yarn snarkjs zkey export solidityverifier "pot/$1_final.zkey" "contracts/$1Verifier.sol"

# Change Solidity compiler version and contract name
sed -i '' 's/0.6.11;/0.8.17;\n\nimport "@big-whale-labs\/versioned-contract\/contracts\/Versioned.sol";/' "contracts/$1Verifier.sol"
sed -i '' "s/contract Verifier {/contract $1Verifier is Versioned {\nconstructor(string memory _version) Versioned(_version) {}/" "contracts/$1Verifier.sol"
yarn prettify

# Copy all the required files to the public directory
cp "pot/$1_final.zkey" "public/$1_final.zkey"
cp "pot/$1_verification_key.json" "public/$1_verification_key.json"
cp "build/$1_js/$1.wasm" "public/$1.wasm"