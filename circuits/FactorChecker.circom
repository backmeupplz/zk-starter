pragma circom 2.0.4;

template FactorChecker() {
  signal input x;
  signal input y;
  
  signal output sum <== x * y;
}

component main{public [y]} = FactorChecker();
