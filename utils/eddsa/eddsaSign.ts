import { buildEddsa } from 'circomlibjs'
import { utils } from 'ethers'
import eddsaPrivateKeyBytes from './eddsaPrivateKeyBytes'

export default async function (message: Uint8Array) {
  const eddsa = await buildEddsa()
  const privateKey = utils.arrayify(eddsaPrivateKeyBytes)
  const publicKey = eddsa.prv2pub(privateKey)
  const signature = eddsa.signMiMC(privateKey, message)
  return {
    publicKey,
    signature,
  }
}
