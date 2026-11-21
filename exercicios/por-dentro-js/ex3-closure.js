function criarCofre(senha) {
  return {
    abrir(tentativa) {
      return tentativa === senha ? 'aberto' : 'negado'
    },
  }
}

const cofre = criarCofre('1234')
console.log(cofre.abrir('0000'))
console.log(cofre.abrir('1234'))
console.log(cofre.senha)
