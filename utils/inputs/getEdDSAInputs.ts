import { buildBabyjub, buildMimc7 } from 'circomlibjs'
import { utils } from 'ethers'
import eddsaSign from '../eddsa/eddsaSign'

async function inputsForMessage(message: string) {
  const babyJub = await buildBabyjub()
  const F = babyJub.F
  const messageBytes = utils.toUtf8Bytes(message)
  const mimc7 = await buildMimc7()
  const M = mimc7.multiHash(messageBytes)
  const { publicKey, signature } = await eddsaSign(M)
  return {
    message: Array.from(messageBytes),
    pubKeyX: F.toObject(publicKey[0]).toString(),
    pubKeyY: F.toObject(publicKey[1]).toString(),
    R8x: F.toObject(signature.R8[0]).toString(),
    R8y: F.toObject(signature.R8[1]).toString(),
    S: signature.S.toString(),
    messageHash: F.toObject(M).toString(),
  }
}

export default function () {
  return inputsForMessage('0123456789')
}
