const parseStringToArray = (input, arrayMaps) => {
  for (let i = 0; i < arrayMaps.length; i++) {
    let map = arrayMaps[i]
    
    if (typeof(input[map]) === 'string') {
      input[map] = input[map].indexOf(',') != -1 ? 
                   // usando regex para retirar os espaço porque o replace(' ', '') não removia de toda a string
                   input[map].replace(/ /g, '').split(",") : input[map].replace(/ /g, '').split(" ");
    }
    else {
      input[map] = [];
    }
  }
}

module.exports = parseStringToArray;