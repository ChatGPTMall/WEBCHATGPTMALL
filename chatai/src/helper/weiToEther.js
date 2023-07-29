export function weiToEther(weiAmount) {
    // 1 Ether = 10^18 Wei
    const etherAmount = weiAmount / 10**18;
    return etherAmount;
  }