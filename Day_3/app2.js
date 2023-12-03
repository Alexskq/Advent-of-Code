import fs from "fs";

const res = fs.readFileSync("./example.txt", "utf-8");
// const input = await res.text();
const matrix = res.trim();
const rowLength = matrix.indexOf("\n") + 1;

function uniq(arr) {
  let seen = [];
  arr.forEach((item) => {
    console.log(seen.indexOf(item));
    console.log(item);
    if (item != undefined && seen.indexOf(item) == -1) {
      seen.push(item);
    }
  });
  console.log(seen);
  return seen;
}

function findIntsTouchingPosition(p) {
  const around = [
    p - 1,
    p + 1, // left-right
    p - rowLength, // above
    p - rowLength - 1, // above left
    p - rowLength + 1, // above right
    p + rowLength, // below
    p + rowLength - 1, // below left
    p + rowLength + 1, // below right
  ];
  return uniq(
    around.map((ap) => {
      return intIndex.pos[ap];
    })
  );
}

// find all integers
const allInts = [...matrix.matchAll(/(\d+)/gim)];
// build an index of which integers are present at each string position
let intIndex = {
  ints: {},
  pos: [],
};
allInts.forEach((intMatch) => {
  let n = parseInt(intMatch[0], 10),
    key = `${intMatch.index}|${intMatch.index + intMatch[0].length - 1}|${n}`;
  intIndex.ints[key] = n;
  for (let i = 0; i < intMatch[0].length; i++) {
    intIndex.pos[intMatch.index + i] = key;
  }
});

// console.log(intIndex);

// Part 1
const allSymbols = [...matrix.matchAll(/[^0-9.\s]/gi)];
let parts = [];
allSymbols.forEach((sym) => {
  const pos = sym.index;
  const touching = findIntsTouchingPosition(pos);
  parts = parts.concat(touching);
});

// uniquify
parts = uniq(parts);

// map/reduce
console.log("PART 1: ");
console.log(
  parts
    .map((p) => {
      return intIndex.ints[p];
    })
    .reduce((a, c) => {
      return a + c;
    }, 0)
);

// // part 2
// // find all "*"
// const allStars = [...matrix.matchAll(/\*/gi)];
// // get all integers touching each star
// let gears = [];
// allStars.forEach((star) => {
//   const pos = star.index;
//   const touching = findIntsTouchingPosition(pos);
//   // if it is exactly 2 integers, we have a gear
//   if (touching.length == 2) {
//     const g = {
//       pos,
//       touching,
//       // product of gear
//       ratio: touching
//         .map((t) => {
//           return intIndex.ints[t];
//         })
//         .reduce((a, c) => {
//           return a * c;
//         }, 1),
//     };
//     gears.push(g);
//   }
// });
// console.log("PART 2: ");
// console.log(gears);

// // sum of products
// const sumOfGearRatios = gears
//   .map((g) => {
//     return g.ratio;
//   })
//   .reduce((a, c) => {
//     return a + c;
//   }, 0);
// console.log(sumOfGearRatios);
