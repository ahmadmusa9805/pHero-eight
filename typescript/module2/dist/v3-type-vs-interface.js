//* type alias vs interface
const user = {
    id: 123,
    name: "abc",
    role: "admin",
};
const cat = {
    species: "Felix Catus",
    breed: "Persian",
};
const car = {
    model: "Corolla",
    brand: "Toyota",
};
///! This is not valid
// type TEmployee = {
//   name: string;
// };
// type TEmployee = {}
const employee = {
    id: 123,
    name: "ABC",
};
export {};
