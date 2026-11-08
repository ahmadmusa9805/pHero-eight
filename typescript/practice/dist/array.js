// // const examMarks: number[] = [1, 2, 3, 4, 5, 10]
// const examMarks: Array<number> = [1, 2, 3, 4, 5, 10]
// // console.log(examMarks);
//  examMarks.push(11)
// console.log(examMarks);
const numberValue = 10;
const stringValue = "10";
const booleanValue = true;
const nullValue = null;
const undefinedValue = undefined;
const anyValue = "hello";
const unknownValue = "hello";
// const neverValue: never = (() => { throw new Error("This function never returns") })()
const bigIntValue = 10n;
const arrayValue = [1, 2, 3, 4, 5];
const arrayValue2 = [1, 2, 3, 4, 5];
const arrayValue3 = [1, 2, 3, 4, 5, "hello"];
const tupleValue = ["hello", 10];
const objectValue = { name: "John", age: 30 };
const Addition = (a, b) => {
    return a + b;
};
console.log(numberValue);
console.log(stringValue);
console.log(booleanValue);
console.log(nullValue);
console.log(undefinedValue);
console.log(anyValue);
console.log(unknownValue);
// console.log(neverValue)
console.log(bigIntValue);
console.log(arrayValue);
console.log(arrayValue2);
console.log(arrayValue3);
console.log(tupleValue);
console.log(objectValue);
console.log(Addition(5, 10));
export {};
