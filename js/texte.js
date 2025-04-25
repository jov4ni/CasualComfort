const array = [111, 22, 2, 111, 3, 3, 4, 4, 44, 4, 111, "aaa", 10000, "abc"];

let copia = [...array].sort((a, b) => a - b);

console.log(copia);