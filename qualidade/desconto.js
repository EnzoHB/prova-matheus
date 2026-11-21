function calcularDesconto(preco, porcentagem) {
  if (preco < 0) throw new Error('preco invalido')
  if (porcentagem < 0 || porcentagem > 100) throw new Error('porcentagem invalida')
  return preco - (preco * porcentagem) / 100
}

module.exports = { calcularDesconto }
