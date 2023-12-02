import fs from "fs";

function partOne(file) {
  let lines = fs.readFileSync(file, "utf-8").split("\n");
  //Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

  const maxCount = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return lines
    .map((line) => {
      return line
        .split(": ")[1]
        .split("; ")
        .map((set) => {
          const tirages = set.split(", ");
          // console.log(tirages);
          return tirages.every((tirage) => {
            const [count, color] = tirage.split(" ");
            // console.log(count, color);
            return maxCount[color] >= Number(count);
          });
        })
        .every((play) => play);
    })
    .reduce((sum, result, i) => {
      return result ? sum + (i + 1) : sum;
    }, 0);
}

console.log(partOne("./example.txt"));

function partTwo(file) {
  let lines = fs.readFileSync(file, "utf-8").split("\n");
  //Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

  return lines
    .map((line) => {
      const maxCount = {
        red: 0,
        green: 0,
        blue: 0,
      };
      line
        .split(": ")[1]
        .split("; ")
        .forEach((set) => {
          const tirages = set.split(", ");
          return tirages.forEach((tirage) => {
            const [count, color] = tirage.split(" ");
            if (maxCount[color] < Number(count)) {
              maxCount[color] = Number(count);
            }
          });
        });
      return maxCount.red * maxCount.blue * maxCount.green;
    })
    .reduce((sum, v) => sum + v);
}

console.log(partTwo("./input2.txt"));
