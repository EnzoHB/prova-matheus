for (var i = 0; i < 3; i++) {}
console.log(i)

try {
  console.log(y)
  let y = 5
} catch (e) {
  console.log('ReferenceError: let fica na TDZ ate a linha da declaracao')
}
