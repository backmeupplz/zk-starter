import { assert } from 'chai'
import { wasm as wasmTester } from 'circom_tester'
import getFactorInputs from '../utils/inputs/getFactorInputs'

describe('FactorChecker circuit', function () {
  before(async function () {
    this.circuit = await wasmTester('circuits/FactorChecker.circom')
    this.baseInputs = await getFactorInputs()
  })

  it('should generate the witness successfully', async function () {
    const inputs = await getFactorInputs()
    const witness = await this.circuit.calculateWitness(inputs)
    await this.circuit.assertOut(witness, {})
    assert.equal(witness[1], inputs.x * inputs.y)
    assert.equal(witness[2], inputs.y)
  })
})
