
export function bitCount (n: number) {
  n = n - ((n >> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
  return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

export function bitSet(n: number, idx: number) {
  return (n & (1 << idx)) > 0
}

export function bitReset(n: number, idx: number) {
  return ((n) ^ (~(1 << idx))) > 0
}


export function setBit(n: number, idx:number) {
  return n | ( 1 << idx)
}

export function clearBit(n: number, idx: number) {
  return n & (~(1 << idx))
}

export function makeUInt8Array(...value: number[]): Uint8Array {
  const res = new Uint8Array(value.length)
  value.forEach((v, i) => {
    res[i] = v
  })
  return res
}
