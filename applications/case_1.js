/*
  Functional Programming use-cases in TypeScript
*/
// Case 1: Object "Components" vs Function "Components"
var MyClassComponent = /** @class */ (function () {
    function MyClassComponent(name, age) {
        this.name = name;
        this.age = age;
        this._name = this.name.value; // Única forma de evitar que o greet seja afetado por sobrescritas em name.value
        this._age = this.age.value; // Única forma de evitar que o greet seja afetado por sobrescritas em age.value
    }
    MyClassComponent.prototype.greet = function () {
        var message = "Hello, my name is " + this._name + " and my age is " + this._age;
        console.log(message);
    };
    return MyClassComponent;
}());
var myName = { value: "Paulo" };
var age = { value: 24 };
var classComponent = new MyClassComponent(myName, age);
classComponent.greet();
myName.value = "José";
age.value = 25;
classComponent.greet();
// Isso não funciona em compile-time, mas funciona em runtime
// classComponent._name = "José";
// classComponent._age = 25;
// classComponent.greet();
var MyFunctionComponent = function (name, age) {
    var _name = name.value;
    var _age = age.value;
    var greetFun = function () {
        var message = "Hello, my name is " + _name + " and my age is " + _age;
        console.log(message);
    };
    return {
        greet: greetFun
    };
};
myName.value = "Paulo";
age.value = 24;
var functionComponent = MyFunctionComponent(myName, age);
functionComponent.greet();
myName.value = "José";
age.value = 25;
functionComponent.greet();
