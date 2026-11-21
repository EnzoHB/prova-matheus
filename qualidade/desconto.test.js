const { calcularDesconto } = require('./desconto')

test('aplica 10% de desconto', () => {
  const preco = 100
  const porcentagem = 10

  const resultado = calcularDesconto(preco, porcentagem)

  expect(resultado).toBe(90)
})

test('desconto de 0% nao muda o preco', () => {
  const preco = 50
  const porcentagem = 0

  const resultado = calcularDesconto(preco, porcentagem)

  expect(resultado).toBe(50)
})

test('preco negativo da erro', () => {
  const preco = -10
  const porcentagem = 10

  const chamar = () => calcularDesconto(preco, porcentagem)

  expect(chamar).toThrow('preco invalido')
})

test('porcentagem maior que 100 da erro', () => {
  const preco = 100
  const porcentagem = 150

  const chamar = () => calcularDesconto(preco, porcentagem)

  expect(chamar).toThrow('porcentagem invalida')
})
