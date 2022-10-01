import * as ed from '@noble/ed25519'
import { BigNumber, utils } from 'ethers'
import { cwd } from 'process'
import { resolve } from 'path'
import { writeFileSync } from 'fs'
import eddsaPrivateKeyBytes from '../utils/eddsa/eddsaPrivateKeyBytes'
import getEdDSAInputs from '../utils/inputs/getEdDSAInputs'
import getFactorInputs from '../utils/inputs/getFactorInputs'

void (async () => {
  console.log('EdDSA private key', utils.hexlify(eddsaPrivateKeyBytes))
  console.log(
    'EdDSA public key',
    BigNumber.from(await ed.getPublicKey(eddsaPrivateKeyBytes)).toString()
  )
  const inputs = {
    eddsa: getEdDSAInputs,
    factor: getFactorInputs,
  }
  for (const [name, fn] of Object.entries(inputs)) {
    const inputs = await fn()
    // Writing inputs
    writeFileSync(
      resolve(cwd(), 'inputs', `input-${name}.json`),
      JSON.stringify(inputs),
      'utf-8'
    )
    console.log(`Generated input-${name}.json!`)
  }
})()
