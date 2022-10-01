pragma circom 2.0.4;

include "./helpers/EdDSAValidator.circom";

template EdDSAChecker() {
  var messageLength = 10;
  // Check if the EdDSA signature is valid
  signal input pubKeyX;
  signal input pubKeyY;
  signal input R8x;
  signal input R8y;
  signal input S;
  signal input message[messageLength];
  signal input messageHash;

  component edDSAValidator = EdDSAValidator(messageLength);
  edDSAValidator.pubKeyX <== pubKeyX;
  edDSAValidator.pubKeyY <== pubKeyY;
  edDSAValidator.R8x <== R8x;
  edDSAValidator.R8y <== R8y;
  edDSAValidator.S <== S;
  edDSAValidator.messageHash <== messageHash;
  for (var i = 0; i < messageLength; i++) {
    edDSAValidator.message[i] <== message[i];
  }
}

component main{public [pubKeyX]} = EdDSAChecker();