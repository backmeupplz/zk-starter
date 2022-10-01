import { wasm as wasmTester } from 'circom_tester'
import getEdDSAInputs from '../utils/inputs/getEdDSAInputs'

describe('EdDSAChecker circuit', function () {
  before(async function () {
    this.circuit = await wasmTester('circuits/EdDSAChecker.circom')
    this.baseInputs = await getEdDSAInputs()
  })
  it('should generate the witness successfully', async function () {
    const witness = await this.circuit.calculateWitness(this.baseInputs)
    await this.circuit.assertOut(witness, {})
  })
})
