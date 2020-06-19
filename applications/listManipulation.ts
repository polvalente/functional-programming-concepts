/*
  Functional Programming use-cases in TypeScript
*/

// Case 3: List manipulation

// OOP/Structured

// Increment items on a list

let list = [1, 2, 3, 4];
let result = [];
for (let i = 0; i < 4; i++) {
  result.push(list[i] + 1);
}
// Get only even items on the incremented list
let list2 = [1, 2, 3, 4];
let result2 = [];
for (let i = 0; i < 4; i++) {
  const incremented = list[i] + 1;
  if (incremented % 2 === 0) {
    result2.push(incremented);
  }
}

// FP
// Increment items on a list
let otherList = [1, 2, 3, 4];
let otherResult = otherList.map((x) => x + 1);

// Get only even items on the incremented list
let otherList2 = [1, 2, 3, 4];
let otherResult2 = otherList2.map((x) => x + 1).filter((x) => x % 2 === 0);
