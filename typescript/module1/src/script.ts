//* Basic types
// let myString: string = "Programming Hero";
// let myNumber: number = 56456;
// let myBoolean: boolean = false;
// let mySymbol: symbol = Symbol();
// let myBigInt: bigint = 100n;

//* Type safe function
const addTwo = (a: number, b: number): number => {
  return a + b;
};

console.log(addTwo(10, 20));

//* Array and Tuple and readonly modifier

// const arr : Array<string> = ["Programming", "Hero"]

const arr: string[] = ["Programming", "Hero"];
const numArr: number[] = [1, 2, 3];

const dhakalatlLong: readonly [number, number] = [23.8103, 90.4125];

//* Optional, Default and rest parameters (...args)

const concatName = (firstName: string, lastName?: string) => {
  if (!lastName) {
    return firstName;
  }
  return firstName + " " + lastName;
};

const greetings = (fullName: string, greeting = "Hello") => {
  console.log(greeting + " " + fullName);
};

greetings("Mir");

//* rest parameters (...args)

const sum = (...numbers: number[]) => {
  return numbers.reduce((total, sum) => total + sum, 0);
};

sum(1, 2, 3, 4, 5, 6);

const logUserAction = (
  ...args: [name: string, age: number, isActive: boolean]
) => {
  const [name, age] = args;

  console.log(name + " is " + age);
};

logUserAction("Mir", 192, false);

//* Object type, type alias and interface

type Address = {
  streetName: string;
  holdingNumber: number;
};

type TUser = {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
  badges: string[];
  address: Address;
};

interface IUser {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
  badges: string[];
}

const user: TUser = {
  name: "Mir",
  age: 123,
  isActive: true,
  action: () => console.log("Hello"),
  badges: ["abc", "def"],
  address: {
    holdingNumber: 123,
    streetName: "ABC",
  },
};

// user.email = "mir@gmail.com";
// console.log(user.address);
