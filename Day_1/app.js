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
// console.log(partOne("./day1.txt"));

const wordRegExp = new RegExp(
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].join(
    "|"
  )
);
console.log(wordRegExp);

function partTwo() {
  let lines = fs.readFileSync("./example.txt", "utf-8").split("\n");

  let arrFusion = [];

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
    let firstNumber = line.split("").find((v) => !Number.isNaN(Number(v)));
    let firstNumberIndex = line
      .split("")
      .findIndex((v) => !Number.isNaN(Number(v))); // retourne l'index du premier chiffre trouvé

    let firstMatchRegExp = line.match(wordRegExp);
    let wordIntoNumber = firstMatchRegExp
      ? convertWordToNumber(firstMatchRegExp.join(""))
      : null;

    // Reste du code...

    let firstD =
      firstMatchRegExp &&
      (firstMatchRegExp.index < firstNumberIndex || firstNumberIndex === -1)
        ? wordIntoNumber
        : firstNumber;

    // ! Last number

    const lastWordRegExp = new RegExp(
      ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
        .join("|")
        .split("")
        .reverse()
        .join("")
    );

    let lastMatchRegExp = line
      .split("")
      .reverse()
      .join("")
      .match(lastWordRegExp);

    let lastWord = lastMatchRegExp
      ? lastMatchRegExp.join("").split("").reverse().join("")
      : undefined;

    let lastWordIndex = lastMatchRegExp ? lastMatchRegExp.index : -1;

    let lastWordIntoNumber = convertWordToNumber(lastWord);
    // console.log(lastWordIntoNumber);

    let lastNumber = line
      .split("")
      .reverse()
      .find((v) => !Number.isNaN(Number(v)));
    let lastNumberIndex = line
      .split("")
      .reverse()
      .findIndex((v) => !Number.isNaN(Number(v)));

    let lastD =
      (lastMatchRegExp && lastMatchRegExp.index < lastNumberIndex) ||
      lastNumberIndex == -1
        ? lastWordIntoNumber
        : lastNumber;

    let fusion = firstD.toString() + lastD.toString();

    arrFusion.push(Number(fusion));

    return arrFusion;
  });
  console.log(arrFusion);
  const result = arrFusion.reduce((sum, value) => sum + value);
  return result;
}

console.log(partTwo());
