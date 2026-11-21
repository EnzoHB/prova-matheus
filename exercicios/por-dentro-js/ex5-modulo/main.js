import { carrinho } from './carrinho.js'

carrinho.adicionar('Ramen', 32)
carrinho.adicionar('Sushi', 45)
carrinho.adicionar('Mochi', 18)

console.log(carrinho.total())
