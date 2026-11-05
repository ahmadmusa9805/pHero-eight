const wrapInArray = (value) => {
    return [value];
};
const stringArr = wrapInArray("ABC");
const numberArr = wrapInArray(123);
stringArr.map((item) => item.toUpperCase());
const userRes = {
    statusCode: 200,
    success: true,
    data: {
        name: "sdfas",
        role: "sfas",
    },
};
export {};
