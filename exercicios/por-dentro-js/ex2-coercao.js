function podeVotar(idade) {
  const n = Number(idade)
  if (Number.isNaN(n)) return false
  return n >= 16
}

console.log(podeVotar('9'))
console.log(podeVotar('16'))
console.log(podeVotar('abc'))
console.log(podeVotar(20))
