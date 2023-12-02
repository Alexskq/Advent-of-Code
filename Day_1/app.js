// ? 1 - mettre le text de day1.txt dans une variable de type string
// ? 2 - split après chaque espace : \n
// ? 3 - push chaque élement dans un tableau
import fs from "fs";

// 4 - sur chaque élément itérer sur chaque caractère et récupérer le premier et le dernier chiffre

function partOne(file) {
  let lines = fs.readFileSync(file, "utf-8").split("\n");
  const values = lines.map((line) => {
    let first = line.split("").find((v) => !Number.isNaN(Number(v)));
    let last = line
      .split("")
      .reverse()
      .find((v) => !Number.isNaN(Number(v)));
    return Number(first + last);
  });
  const result = values.reduce((sum, value) => sum + value);
  return result;
}
console.log(partOne("./day1.txt"));

const wordRegExp = new RegExp(
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].join(
    "|"
  )
);
console.log(wordRegExp);

// convertir les match de regex en nombre

function partTwo() {
  let lines = fs.readFileSync("./example.txt", "utf-8").split("\n");

  function convertWordToNumber(word) {
    const wordToNumberMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };
    return wordToNumberMap[word] || 0;
  }

  const values = lines.map((line) => {
    let first = line.split("").find((v) => !Number.isNaN(Number(v)));
    let firstMatchRegExp = line.match(wordRegExp);
    let number = firstMatchRegExp.join("");
    let conversion = convertWordToNumber(number);

    console.log(conversion);
  });
  return values;
}

partTwo();
