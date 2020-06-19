/*
  Functional Programming use-cases in TypeScript
*/

// Case 1: Class "Components" vs Function "Components"

class MyClassComponent {
  name: { value: string };
  age: { value: number };

  readonly _name: string; // Proteção apenas em compile-time!!
  readonly _age: number;

  constructor(name: { value: string }, age: { value: number }) {
    this.name = name;
    this.age = age;
    this._name = this.name.value; // Única forma de evitar que o greet seja afetado por sobrescritas em name.value
    this._age = this.age.value; // Única forma de evitar que o greet seja afetado por sobrescritas em age.value
  }

  greet() {
    const message = `Hello, my name is ${this._name} and my age is ${this._age}`;
    console.log(message);
  }
}

let myName = { value: "Paulo" };
let age = { value: 24 };

const classComponent = new MyClassComponent(myName, age);

classComponent.greet();

myName.value = "José";
age.value = 25;
classComponent.greet();

// Isso não funciona em compile-time, mas funciona em runtime
// classComponent._name = "José";
// classComponent._age = 25;
// classComponent.greet();

const MyFunctionComponent = (
  name: { value: string },
  age: { value: number }
): { greet: () => void } => {
  const _name = name.value;
  const _age = age.value;

  const greetFun = () => {
    const message = `Hello, my name is ${_name} and my age is ${_age}`;
    console.log(message);
  };

  return {
    greet: greetFun,
  };
};

myName.value = "Paulo";
age.value = 24;

const functionComponent = MyFunctionComponent(myName, age);

functionComponent.greet();

myName.value = "José";
age.value = 25;

functionComponent.greet();
