const respostas = {
  a: 'Promise.any: o primeiro sucesso vence e as falhas sao ignoradas',
  b: 'Promise.allSettled: nunca rejeita, olha o status de cada widget',
  c: 'Promise.all: se um falhar o conjunto todo rejeita',
  d: 'Promise.race: corrida entre a busca e um timeout que rejeita',
}

for (const letra in respostas) {
  console.log(letra + ') ' + respostas[letra])
}
