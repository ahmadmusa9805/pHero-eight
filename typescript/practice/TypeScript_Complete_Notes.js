// ============================================================
// 1. BASIC AND ADVANCED TYPES (19)
// ============================================================
// 1) string — text.
const personName = "Musa";
// 2) number — integer or decimal.
const age = 25;
const price = 99.5;
// 3) boolean — true/false.
const isActive = true;
// 4) bigint — integers larger than the safe number limit.
const hugeNumber = 9007199254740993n;
// 5) symbol — creates unique identifiers.
const uniqueKey = Symbol("user-id");
// 6) null — intentional absence of value.
const emptyValue = null;
// 7) undefined — missing/undefined value.
const missingValue = undefined;
// 8) object — any non-primitive type (does not list specific properties).
const basicObject = { name: "Musa" };
// 9) any — accepts anything; bypasses most type checking.
let flexibleValue = 100;
flexibleValue = "Hello";
flexibleValue = true;
// 10) unknown — accepts anything, but CHECK before using it.
const uncertainValue = "Hello";
if (typeof uncertainValue === "string") {
    console.log(uncertainValue.toUpperCase()); // HELLO
}
// 11) never — no possible value; function never returns normally.
function throwFailure() {
    throw new Error("Failed");
}
// Don't call throwFailure() unless you want the program to stop.
// 12) void — function returns no useful value.
function sayHello() {
    console.log("Hello!");
}
// 13) array — multiple values of the same element type.
const marks = [80, 90, 100];
const friends = ["Amina", "Rahim"];
// 14) tuple — specific element types in specified positions.
const personTuple = ["Musa", 25];
// const invalidTuple: [string, number] = [25, "Musa"]; // ERROR
// 15) enum — named constants (enum members have their own type).
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["User"] = "USER";
})(Role || (Role = {}));
function checkAccess(role) {
    if (role === Role.Admin) {
        console.log("Full access");
    }
    else {
        console.log("Limited access");
    }
}
checkAccess(Role.Admin); // Correct: member of the enum.
checkAccess(Role.User); // Correct.
// checkAccess("ADMIN"); // ERROR: plain string isn't a Role enum member.
// checkAccess("Admin"); // ERROR: different string, also not enum member.
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
const selectedColor = Color.Red; // Numeric value 0, NOT "Red".
let userId = 101;
userId = "USER101";
function checkAccessText(role) {
    if (role === "ADMIN")
        console.log("Full access (string union)");
}
checkAccessText("ADMIN"); // Valid without Role.Admin.
const staff = { name: "Musa", salary: 50000 };
// 18) literal — only a specific value or set of values is allowed.
let accountStatus = "active";
accountStatus = "inactive";
// accountStatus = "pending"; // ERROR
// 19) function type — types its parameters AND result.
let add;
add = (a, b) => a + b;
console.log(add(10, 20)); // 30
const basicUser = { name: "Musa", age: 25 };
const employee = { name: "Musa", salary: 50000 };
// Both 'type' and 'interface' can describe objects.
// Unlike type aliases, interfaces also support declaration merging.
// 3) generics (<T>) — reusable code that keeps the actual type.
function identity(value) {
    return value;
}
const textResult = identity("Hello");
const numberResult = identity(100);
const update = { name: "Musa" };
const complete = {
    id: 1, name: "Musa", email: "musa@example.com", password: "secret",
};
const safeUser = complete;
const preview = { id: 1, name: "Musa" };
const publicUser = { id: 1, name: "Musa" };
const permissions = { admin: true, user: false };
const finalStatus = "active";
const chosenStatus = "pending";
const validEmail = "hello@example.com";
// 10) ReturnType<T> — obtain a function's RETURN type.
function getAge() { return 25; }
const extractedAge = 25;
const resolvedText = "Done";
// 12) Parameters<T> — obtain a function's arguments as a tuple.
function multiply(a, b) { return a * b; }
const multiplyArgs = [5, 10];
// 13) ConstructorParameters<T> — obtain constructor arguments as a tuple.
class Customer {
    name;
    constructor(name) {
        this.name = name;
    }
}
const customerArgs = ["Musa"];
const customer = new Customer("Musa");
// 15) NoInfer<T> — don't infer T from this particular argument.
function choose(options, selected) {
    return selected;
}
const chosenColor = choose(["red", "blue"], "red");
// choose(["red", "blue"] as const, "green"); // ERROR
// 16) ThisParameterType<T> — extract an explicit `this` parameter's type.
function greetWithThis() {
    return this.name;
}
const greetContext = { name: "Musa" };
const boundGreet = greetWithThis.bind({ name: "Musa" });
const greetingModel = {
    name: "Musa",
    greet() { return this.name; },
};
const upperRole = "ADMIN";
const lowerRole = "admin";
const greetingTitle = "Hello";
const smallGreeting = "hello";
// ============================================================
// 4. DEVELOPMENT TOOLS — NOTES
// ============================================================
// CLI: terminal interface (e.g., tsc --version).
// Compiler (tsc): type-checks and can emit JavaScript (npx tsc).
// LSP: editor-server protocol for autocomplete, errors, hover, etc.
//      TypeScript typically uses its language service/tsserver in editors.
// Check installed version:    tsc --version
// Check project's version:   npm list typescript
// Install globally:          npm install -g typescript
// ============================================================
// 5. QUICK RECAP
// ============================================================
// any        = any value, very little checking
// unknown    = any value, but check before using
// never      = impossible value / function never returns normally
// void       = no useful return value
// tuple      = fixed element positions and types
// enum       = named constants, e.g., Role.Admin
// union |    = one of the listed types
// intersection & = satisfy multiple type requirements
// literal    = exact allowed value(s)
// type       = name a type
// interface  = object shape, can be extended/merged
// generics   = reusable code preserving the actual type
// Partial    = optional properties
// Required   = required properties
// Readonly   = disallow property reassignment in TS
// Pick       = keep properties
// Omit       = exclude properties from a type
// Record     = keys and value types
// Exclude    = remove union choices
// Extract    = keep union choices
// NonNullable= remove null/undefined
// ReturnType = function return type
// Awaited    = unwrapped Promise type
// Parameters = function parameter tuple
// ConstructorParameters = constructor parameter tuple
// InstanceType = class instance type
// NoInfer    = block one source of generic inference
// ThisParameterType = read explicit this type
// OmitThisParameter = remove explicit this parameter
// ThisType   = contextual this type in object methods
// Uppercase / Lowercase / Capitalize / Uncapitalize = string literal transforms
// Keep references "used" so examples can be easily inspected while debugging.
console.log({
    personName, age, price, isActive, hugeNumber: String(hugeNumber),
    uniqueKey: String(uniqueKey), emptyValue, missingValue, basicObject,
    flexibleValue, marks, friends, personTuple, selectedColor, userId,
    accountStatus, staff, basicUser, employee, textResult, numberResult,
    update, complete, safeUser, preview, publicUser, permissions,
    finalStatus, chosenStatus, validEmail, extractedAge, resolvedText,
    multiplyArgs, customerArgs, customer, chosenColor, greetContext,
    boundGreeting: boundGreet(), greeting: greetingModel.greet(),
    upperRole, lowerRole, greetingTitle, smallGreeting,
});
export {};
// sayHello() is available to call as a void-function example.
// throwFailure() is intentionally not called.
