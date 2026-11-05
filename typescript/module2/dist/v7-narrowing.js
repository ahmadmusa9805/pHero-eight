//* "typeof"
let x = 123;
console.log(typeof x);
//* Type Guard
const print = (value) => {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    else {
        return value;
    }
};
const loggedInUser = {
    name: "Mir",
    address: {
        street: "ABC",
    },
};
const showAddress = (user) => {
    if (user && user.address) {
        console.log(user.address.street);
        return;
    }
    throw new Error("User not found");
};
export {};
