function buscarPreco(produto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!produto) return reject(new Error('sem produto'))
      resolve(99.9)
    }, 500)
  })
}

buscarPreco('teclado')
  .then((preco) => console.log('preco:', preco))
  .catch((e) => console.log('erro:', e.message))

buscarPreco()
  .then((preco) => console.log('preco:', preco))
  .catch((e) => console.log('erro:', e.message))
