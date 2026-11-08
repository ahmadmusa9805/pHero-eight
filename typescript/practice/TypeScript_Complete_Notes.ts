/**
 * TYPESCRIPT REVISION — CODE + SHORT NOTES
 * Covers: 19 type/type forms, type aliases, interfaces, generics,
 * all 22 built-in utility types, enums, and TypeScript developer tools.
 *
 * Type-check: tsc --noEmit --strict --target ES2020 typescript-revision.ts
 * Compile:    tsc --target ES2020 --module commonjs typescript-revision.ts
 * Run JS:     node typescript-revision.js
 *
 * Notes:
 * - Many TypeScript types disappear when compiled to JavaScript.
 * - NoInfer<T> needs TypeScript 5.4 or later.
 * - Uncomment lines marked ERROR to see type errors.
 */
export {}; // Make this file a module, avoiding collisions with other files.

// ============================================================
// 1. BASIC AND ADVANCED TYPES (19)
// ============================================================

// 1) string — text.
const personName: string = "Musa";

// 2) number — integer or decimal.
const age: number = 25;
const price: number = 99.5;

// 3) boolean — true/false.
const isActive: boolean = true;

// 4) bigint — integers larger than the safe number limit.
const hugeNumber: bigint = 9007199254740993n;

// 5) symbol — creates unique identifiers.
const uniqueKey: symbol = Symbol("user-id");

// 6) null — intentional absence of value.
const emptyValue: null = null;

// 7) undefined — missing/undefined value.
const missingValue: undefined = undefined;

// 8) object — any non-primitive type (does not list specific properties).
const basicObject: object = { name: "Musa" };

// 9) any — accepts anything; bypasses most type checking.
let flexibleValue: any = 100;
flexibleValue = "Hello";
flexibleValue = true;

// 10) unknown — accepts anything, but CHECK before using it.
const uncertainValue: unknown = "Hello";
if (typeof uncertainValue === "string") {
  console.log(uncertainValue.toUpperCase()); // HELLO
}

// 11) never — no possible value; function never returns normally.
function throwFailure(): never {
  throw new Error("Failed");
}
// Don't call throwFailure() unless you want the program to stop.

// 12) void — function returns no useful value.
function sayHello(): void {
  console.log("Hello!");
}

// 13) array — multiple values of the same element type.
const marks: number[] = [80, 90, 100];
const friends: Array<string> = ["Amina", "Rahim"];

// 14) tuple — specific element types in specified positions.
const personTuple: [string, number] = ["Musa", 25];
// const invalidTuple: [string, number] = [25, "Musa"]; // ERROR

// 15) enum — named constants (enum members have their own type).
enum Role {
  Admin = "ADMIN",
  User = "USER",
}
function checkAccess(role: Role): void {
  if (role === Role.Admin) {
    console.log("Full access");
  } else {
    console.log("Limited access");
  }
}
checkAccess(Role.Admin); // Correct: member of the enum.
checkAccess(Role.User);  // Correct.
// checkAccess("ADMIN"); // ERROR: plain string isn't a Role enum member.
// checkAccess("Admin"); // ERROR: different string, also not enum member.

enum Color {
  Red,   // 0
  Green, // 1
  Blue,  // 2
}
const selectedColor: Color = Color.Red; // Numeric value 0, NOT "Red".

// 16) union (|) — a value can have ONE of the listed types.
type UserId = string | number;
let userId: UserId = 101;
userId = "USER101";

// String union alternative to an enum (allows direct strings).
type RoleText = "ADMIN" | "USER";
function checkAccessText(role: RoleText): void {
  if (role === "ADMIN") console.log("Full access (string union)");
}
checkAccessText("ADMIN"); // Valid without Role.Admin.
// checkAccessText("Admin"); // ERROR: exact spelling matters.

// 17) intersection (&) — must satisfy BOTH sets of requirements.
type PersonDetails = { name: string };
type EmployeeDetails = { salary: number };
type Staff = PersonDetails & EmployeeDetails;
const staff: Staff = { name: "Musa", salary: 50000 };

// 18) literal — only a specific value or set of values is allowed.
let accountStatus: "active" | "inactive" = "active";
accountStatus = "inactive";
// accountStatus = "pending"; // ERROR

// 19) function type — types its parameters AND result.
let add: (a: number, b: number) => number;
add = (a, b) => a + b;
console.log(add(10, 20)); // 30

// ============================================================
// 2. THREE TYPE-SYSTEM FEATURES
// ============================================================

// 1) type (type alias) — a reusable name for any kind of type.
type BasicUser = { name: string; age: number };
const basicUser: BasicUser = { name: "Musa", age: 25 };
type StringOrNumber = string | number; // type can also express unions.

// 2) interface — describes an object's structure; can extend interfaces.
interface Person {
  name: string;
}
interface Employee extends Person {
  salary: number;
}
const employee: Employee = { name: "Musa", salary: 50000 };
// Both 'type' and 'interface' can describe objects.
// Unlike type aliases, interfaces also support declaration merging.

// 3) generics (<T>) — reusable code that keeps the actual type.
function identity<T>(value: T): T {
  return value;
}
const textResult = identity<string>("Hello");
const numberResult = identity<number>(100);

// ============================================================
// 3. ALL 22 BUILT-IN UTILITY TYPES
// ============================================================

// Shared example type for utilities 1–6.
type AppUser = {
  id: number;
  name: string;
  email?: string;
  password: string;
};

// 1) Partial<T> — ALL properties optional (useful for patch/update forms).
type UpdateUser = Partial<AppUser>;
const update: UpdateUser = { name: "Musa" };

// 2) Required<T> — ALL properties required, including email.
type CompleteUser = Required<AppUser>;
const complete: CompleteUser = {
  id: 1, name: "Musa", email: "musa@example.com", password: "secret",
};

// 3) Readonly<T> — cannot reassign top-level properties in TypeScript.
type SafeUser = Readonly<AppUser>;
const safeUser: SafeUser = complete;
// safeUser.name = "Other"; // ERROR
// Readonly is shallow and doesn't freeze JavaScript objects at runtime.

// 4) Pick<T, K> — keep ONLY selected properties.
type UserPreview = Pick<AppUser, "id" | "name">;
const preview: UserPreview = { id: 1, name: "Musa" };

// 5) Omit<T, K> — remove properties from a TYPE.
type PublicUser = Omit<AppUser, "password">;
const publicUser: PublicUser = { id: 1, name: "Musa" };
// Omit does NOT delete password data from a real JS object.

// 6) Record<K, T> — object with keys K and value types T.
type AccountRole = "admin" | "user";
type Permissions = Record<AccountRole, boolean>;
const permissions: Permissions = { admin: true, user: false };
// Same type as: { admin: boolean; user: boolean }

// 7) Exclude<T, U> — REMOVE matching members from a union.
type AllStatuses = "active" | "inactive" | "pending";
type FinalStatuses = Exclude<AllStatuses, "pending">; // "active" | "inactive"
const finalStatus: FinalStatuses = "active";

// 8) Extract<T, U> — KEEP matching members from a union.
type ChosenStatuses = Extract<AllStatuses, "active" | "pending">;
const chosenStatus: ChosenStatuses = "pending";

// 9) NonNullable<T> — remove null and undefined from a type.
type MaybeEmail = string | null | undefined;
type ValidEmail = NonNullable<MaybeEmail>; // string
const validEmail: ValidEmail = "hello@example.com";

// 10) ReturnType<T> — obtain a function's RETURN type.
function getAge(): number { return 25; }
type AgeType = ReturnType<typeof getAge>; // number
const extractedAge: AgeType = 25;

// 11) Awaited<T> — obtain a Promise's resolved type.
type ResolvedText = Awaited<Promise<string>>; // string
const resolvedText: ResolvedText = "Done";

// 12) Parameters<T> — obtain a function's arguments as a tuple.
function multiply(a: number, b: number): number { return a * b; }
type MultiplyArgs = Parameters<typeof multiply>; // [a: number, b: number]
const multiplyArgs: MultiplyArgs = [5, 10];

// 13) ConstructorParameters<T> — obtain constructor arguments as a tuple.
class Customer {
  constructor(public name: string) {}
}
type CustomerArgs = ConstructorParameters<typeof Customer>; // [name: string]
const customerArgs: CustomerArgs = ["Musa"];

// 14) InstanceType<T> — obtain the instance type of a class.
type CustomerInstance = InstanceType<typeof Customer>;
const customer: CustomerInstance = new Customer("Musa");

// 15) NoInfer<T> — don't infer T from this particular argument.
function choose<T extends string>(options: readonly T[], selected: NoInfer<T>): T {
  return selected;
}
const chosenColor = choose(["red", "blue"] as const, "red");
// choose(["red", "blue"] as const, "green"); // ERROR

// 16) ThisParameterType<T> — extract an explicit `this` parameter's type.
function greetWithThis(this: { name: string }): string {
  return this.name;
}
type GreetContext = ThisParameterType<typeof greetWithThis>; // { name: string }
const greetContext: GreetContext = { name: "Musa" };

// 17) OmitThisParameter<T> — remove the explicit `this` parameter from a type.
type BoundGreeting = OmitThisParameter<typeof greetWithThis>; // () => string
const boundGreet: BoundGreeting = greetWithThis.bind({ name: "Musa" });

// 18) ThisType<T> — contextual `this` type in object methods.
// With --strict (or --noImplicitThis), `this.name` is type-checked.
type GreetingModel = {
  name: string;
  greet(): string;
} & ThisType<{ name: string }>;
const greetingModel: GreetingModel = {
  name: "Musa",
  greet() { return this.name; },
};

// 19) Uppercase<T> — uppercase STRING LITERAL types.
type UpperRole = Uppercase<"admin">; // "ADMIN"
const upperRole: UpperRole = "ADMIN";

// 20) Lowercase<T> — lowercase STRING LITERAL types.
type LowerRole = Lowercase<"ADMIN">; // "admin"
const lowerRole: LowerRole = "admin";

// 21) Capitalize<T> — uppercase the first character.
type GreetingTitle = Capitalize<"hello">; // "Hello"
const greetingTitle: GreetingTitle = "Hello";

// 22) Uncapitalize<T> — lowercase the first character.
type SmallGreeting = Uncapitalize<"Hello">; // "hello"
const smallGreeting: SmallGreeting = "hello";

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
// sayHello() is available to call as a void-function example.
// throwFailure() is intentionally not called.
