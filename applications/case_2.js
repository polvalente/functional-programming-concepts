/*
  Functional Programming use-cases in TypeScript
*/
var _a, _b;
// Case 2: Global state that is mantained "outside" of the global scope
// OOP - This pollutes the global state implicitly (possible undesired side-effects)
{
    var globalIncCount_1 = 0;
    function inc(x) {
        globalIncCount_1 = ++globalIncCount_1;
        console.log("count: ", globalIncCount_1);
        return ++x;
    }
}
console.log("result: ", inc(1));
console.log("result: ", inc(1));
console.log("result: ", inc(1));
// console.log(globalIncCount);
// Functional
function incFunctional(x, count) {
    if (count === void 0) { count = 0; }
    console.log("count: ", count);
    return [++x, ++count];
}
var _c = incFunctional(1), _ = _c[0], count = _c[1];
_a = incFunctional(2, count), _ = _a[0], count = _a[1];
_b = incFunctional(3, count), _ = _b[0], count = _b[1];
