/*
  Functional Programming use-cases in TypeScript
*/

// Case 2: Global state that is mantained "outside" of the global scope

// OOP - This pollutes the global state implicitly (possible undesired side-effects)
{
  let globalIncCount = 0;
  function inc(x) {
    globalIncCount = ++globalIncCount;
    console.log("count: ", globalIncCount);
    return ++x;
  }
}

console.log("result: ", inc(1));
console.log("result: ", inc(1));
console.log("result: ", inc(1));
// console.log(globalIncCount);

// Functional
function incFunctional(x, count = 0) {
  console.log("count: ", count);
  return [++x, ++count];
}

let [_, count] = incFunctional(1);
[_, count] = incFunctional(1, count);
[_, count] = incFunctional(1, count);
