import * as snarkjs from 'snarkjs'
import { cwd } from 'process'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export default async function (proofName: string) {
  const proof = JSON.parse(
    readFileSync(resolve(cwd(), 'build', `proof-${proofName}.json`), 'utf8')
  )
  const publicInputs = JSON.parse(
    readFileSync(resolve(cwd(), 'build', `public-${proofName}.json`), 'utf8')
  )
  const callDataString = await snarkjs.groth16.exportSolidityCallData(
    proof,
    publicInputs
  )
  const splitData = callDataString.split('],[')
  return {
    a: JSON.parse(`${splitData[0]}]`),
    b: JSON.parse(`[${splitData[1]}],[${splitData[2]}]`),
    c: JSON.parse(`[${splitData[3]}]`),
    input: JSON.parse(`[${splitData[4]}`),
  }
}
