//* Type assertion
const someStatus = "pending";
const showStatus = (status) => {
    console.log("Your current application status is " + status);
};
showStatus(someStatus);
const config = {
    port: 5000,
};
const currentPort = config.port;
// const currentPort: number = config.port as number;
//* constant assertion
const configuration = {
    port: 8080,
    prefix: "/api/v2",
};
export {};
