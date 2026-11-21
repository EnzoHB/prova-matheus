class Forma {
  calcularArea() {
    return 0
  }
}

class Retangulo extends Forma {
  constructor({ base, altura }) {
    super()
    this.base = base
    this.altura = altura
  }

  calcularArea() {
    return this.base * this.altura
  }
}

const forma = new Forma()
const ret = new Retangulo({ base: 4, altura: 5 })
console.log(forma.calcularArea())
console.log(ret.calcularArea())
console.log(ret instanceof Forma)
