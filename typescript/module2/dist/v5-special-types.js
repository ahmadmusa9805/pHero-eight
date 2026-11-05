//* Top types
let helloWorld = "Hello World";
helloWorld = 123;
helloWorld.length;
const something = "Hello World";
// something.length;
//* Core types
let something2;
const num = 123;
something2 = num;
let someStatus;
let status = "pending";
someStatus = status;
const currentUser = null;
//* Unit type
const greet = () => {
    console.log("Hello World");
};
greet();
//* Sub-type of unit type
const anotherGreet = () => {
    console.log("Hello World");
    return undefined;
};
const greetings = anotherGreet();
console.log(greetings);
export {};
//* Bottom type
// const getError = (msg: string): never => {
//   throw new Error(msg);
// };
// const x: null = getError("ABC");
