function login(user) {
  return new Promise((resolve) => setTimeout(() => resolve('token-' + user), 200))
}

function buscarCarrinho(token) {
  return new Promise((resolve) => setTimeout(() => resolve({ token, itens: 3 }), 200))
}

function finalizar(carrinho) {
  return new Promise((resolve) =>
    setTimeout(() => resolve('pedido ok com ' + carrinho.itens + ' itens'), 200),
  )
}

async function comprar(user) {
  try {
    const t = await login(user)
    const c = await buscarCarrinho(t)
    const r = await finalizar(c)
    console.log(r)
  } catch (e) {
    console.log('falhou:', e.message)
  }
}

comprar('enzo')
