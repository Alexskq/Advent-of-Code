import fs from "fs";

// console.log(regEx);

function partOne(file) {
  let lines = fs.readFileSync(file, "utf-8").split("\n");

  const partNumbers = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    for (let j = 0; j < line.length; j++) {
      let char = line[j];

      if (char !== "." && char !== " ") {
        console.log(char);
      }
    }
  }

  return lines;
  // .map((line) => {
}

console.log(partOne("./example.txt"));
