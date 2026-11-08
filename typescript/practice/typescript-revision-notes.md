# TypeScript — Complete Revision Notes

Beginner-friendly reference for everything we discussed. Each code example also appears in `typescript-revision.ts` with comments.

## 1. All names first

### 19 common types and type forms
1. `string`
2. `number`
3. `boolean`
4. `bigint`
5. `symbol`
6. `null`
7. `undefined`
8. `object`
9. `any`
10. `unknown`
11. `never`
12. `void`
13. `array`
14. `tuple`
15. `enum`
16. `union`
17. `intersection`
18. `literal`
19. `function`

### 3 type-system features
1. `type` (type alias)
2. `interface`
3. `generics`

### 22 built-in utility types
1. `Partial<T>`
2. `Required<T>`
3. `Readonly<T>`
4. `Pick<T, K>`
5. `Omit<T, K>`
6. `Record<K, T>`
7. `Exclude<T, U>`
8. `Extract<T, U>`
9. `NonNullable<T>`
10. `ReturnType<T>`
11. `Awaited<T>`
12. `Parameters<T>`
13. `ConstructorParameters<T>`
14. `InstanceType<T>`
15. `NoInfer<T>`
16. `ThisParameterType<T>`
17. `OmitThisParameter<T>`
18. `ThisType<T>`
19. `Uppercase<T>`
20. `Lowercase<T>`
21. `Capitalize<T>`
22. `Uncapitalize<T>`

> These are **not 44 separate JavaScript data types**. The list mixes data types, type forms, TypeScript features, and utilities. TypeScript can express unlimited combinations.

---

## 2. Basic and advanced types — examples

| Type | Meaning | Example |
|---|---|---|
| `string` | Text | `let name: string = "Musa";` |
| `number` | Integers and decimals | `let age: number = 25;` |
| `boolean` | True/false | `let active: boolean = true;` |
| `bigint` | Very large integers | `let big: bigint = 9007199254740993n;` |
| `symbol` | Unique identifier | `let id: symbol = Symbol("id");` |
| `null` | Intentional absence | `let data: null = null;` |
| `undefined` | Missing value | `let x: undefined = undefined;` |
| `object` | Non-primitive | `let user: object = { name: "Musa" };` |
| `any` | Anything; skips most checks | `let v: any = "hello";` |
| `void` | No useful return | `function log(): void { console.log("Hi"); }` |
| `array` | Collection of same element type | `let scores: number[] = [80, 90];` |
| `tuple` | Defined types at positions | `let person: [string, number] = ["Musa", 25];` |
| `literal` | Exact allowed value | `let status: "active" = "active";` |
| `function` | Typed inputs and output | `let add: (a: number, b: number) => number = (a,b) => a+b;` |

### `unknown` vs `never`

```ts
let value: unknown = "Hello";
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Safe after checking
}

function fail(): never {
  throw new Error("Failed"); // Never returns normally
}
```

- `unknown`: A value is present, but you **do not know its type** until you check.
- `never`: **No possible value**; useful for impossible cases and functions that always throw.

### `enum` — predefined named constants

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER"
}

function checkAccess(role: Role) {
  if (role === Role.Admin) console.log("Full access");
}

checkAccess(Role.Admin); // OK
checkAccess(Role.User);  // OK
// checkAccess("ADMIN"); // Type error: plain string is not this enum member
```

Here, `role: Role` means the caller must pass a **member of Role**. `Role.Admin` evaluates to `"ADMIN"`, but a plain string is not accepted by the string enum type.

```ts
enum Color { Red, Green, Blue }
const myColor: Color = Color.Red; // 0, not "Red"
```

**Want to call with `"ADMIN"` directly? Use a string union:**

```ts
type RoleText = "ADMIN" | "USER";
function checkAccessText(role: RoleText) { console.log(role); }
checkAccessText("ADMIN"); // OK
```

### `union` (`|`) vs `intersection` (`&`)

```ts
// UNION: one of multiple types
let id: string | number = 123;
id = "USR123";

// INTERSECTION: must satisfy both types
type Person = { name: string };
type Employee = { salary: number };
type Staff = Person & Employee;
const staff: Staff = { name: "Musa", salary: 50000 };
```

---

## 3. `type`, `interface`, and `generics`

### `type` = reusable name for any type

```ts
type User = { name: string; age: number };
const user: User = { name: "Musa", age: 25 };
type ID = string | number; // A type alias can name a union
```

### `interface` = object's structure; supports `extends`

```ts
interface Person { name: string }
interface Employee extends Person { salary: number }
const employee: Employee = { name: "Musa", salary: 50000 };
```

**Difference:** Both describe objects. A `type` can directly name unions, tuples, etc. An `interface` supports declaration merging and commonly uses `extends` to inherit properties.

### `generics` = reusable, type-safe code

```ts
function identity<T>(value: T): T {
  return value;
}
identity<string>("Hello");
identity<number>(100);
```

`T` is a placeholder for the actual type. Use generics for shared functions, API response wrappers, and collections.

---

## 4. The 22 utility types — examples and use cases

**Starting type:**

```ts
type User = {
  id: number;
  name: string;
  email?: string;
  password: string;
};
```

### 1. `Partial<T>` — make all fields optional

```ts
type UpdateUser = Partial<User>;
const update: UpdateUser = { name: "Musa" };
```

Use case: Updating only some fields in a form.

### 2. `Required<T>` — make all fields required

```ts
type CompleteUser = Required<User>;
const u: CompleteUser = {
  id: 1, name: "Musa", email: "musa@example.com", password: "secret"
};
```

Use case: A complete form record must include every field.

### 3. `Readonly<T>` — prevent property reassignment

```ts
type SafeUser = Readonly<User>;
```

Use case: Protect configurations from accidental changes. Type-level and shallow; **not** runtime freezing.

### 4. `Pick<T, K>` — keep only selected fields

```ts
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }
```

Use case: A compact user profile.

### 5. `Omit<T, K>` — exclude fields from a type

```ts
type PublicUser = Omit<User, "password">;
```

Use case: Describe an API response without a password. **It does not remove actual object properties.**

### 6. `Record<K, T>` — required object keys and values

```ts
type Role = "admin" | "user";
type Permissions = Record<Role, boolean>;
const p: Permissions = { admin: true, user: false };
```

Use case: Role permissions and settings. Every key is required; every value is `boolean`.

### 7. `Exclude<T, U>` — remove union options

```ts
type Status = "active" | "inactive" | "pending";
type FinalStatus = Exclude<Status, "pending">; // "active" | "inactive"
```

Use case: Prevent an unwanted status.

### 8. `Extract<T, U>` — keep matching union options

```ts
type Status = "active" | "inactive" | "pending";
type Selected = Extract<Status, "active" | "pending">; // "active" | "pending"
```

Use case: Select allowed statuses.

### 9. `NonNullable<T>` — remove `null` and `undefined`

```ts
type MaybeEmail = string | null | undefined;
type Email = NonNullable<MaybeEmail>; // string
```

Use case: Represent a known non-null value.

### 10. `ReturnType<T>` — function output type

```ts
function getAge() { return 25; }
type Age = ReturnType<typeof getAge>; // number
```

Use case: Reuse the return type of a function.

### 11. `Awaited<T>` — resolved Promise value type

```ts
type Result = Awaited<Promise<string>>; // string
```

Use case: Async function results.

### 12. `Parameters<T>` — function input tuple

```ts
function add(a: number, b: number) { return a + b; }
type Args = Parameters<typeof add>; // [a: number, b: number]
```

Use case: Reuse a function's inputs.

### 13. `ConstructorParameters<T>` — class constructor input tuple

```ts
class Customer { constructor(public name: string) {} }
type Args = ConstructorParameters<typeof Customer>; // [name: string]
```

Use case: Reuse constructor arguments.

### 14. `InstanceType<T>` — class instance type

```ts
class Customer { name = "Musa"; }
type CustomerInstance = InstanceType<typeof Customer>;
```

Use case: Type variables holding class instances.

### 15. `NoInfer<T>` — prevent one argument from inferring `T`

```ts
function choose<T extends string>(options: readonly T[], selected: NoInfer<T>): T {
  return selected;
}
choose(["red", "blue"] as const, "red");
// choose(["red", "blue"] as const, "green"); // Error
```

Use case: Require a selected value to match choices inferred elsewhere. Available since TypeScript 5.4.

### 16. `ThisParameterType<T>` — get an explicit `this` type

```ts
function greet(this: { name: string }) { return this.name; }
type Context = ThisParameterType<typeof greet>; // { name: string }
```

Use case: Reuse a function's required context.

### 17. `OmitThisParameter<T>` — remove explicit `this` parameter

```ts
function greet(this: { name: string }) { return this.name; }
type BoundGreeting = OmitThisParameter<typeof greet>; // () => string
```

Use case: Functions whose `this` has already been bound.

### 18. `ThisType<T>` — specify contextual `this` inside an object

```ts
type Person = { name: string };
const person: Person & { greet(): string } & ThisType<Person> = {
  name: "Musa",
  greet() { return this.name; }
};
```

Use case: Object methods referring to properties through `this`; enable `noImplicitThis` or `strict`.

### 19–22. String literal utilities

```ts
type A = Uppercase<"admin">;    // "ADMIN"
type B = Lowercase<"ADMIN">;    // "admin"
type C = Capitalize<"hello">;   // "Hello"
type D = Uncapitalize<"Hello">; // "hello"
```

Use case: Transform naming conventions in **types**; these do not change runtime strings.

---

## 5. JavaScript vs. TypeScript

- **JavaScript values**: strings, numbers, booleans, bigints, symbols, `null`, `undefined`, objects, arrays, functions.
- **TypeScript-only type features**: `any`, `unknown`, `never`, `void`, tuples, unions, intersections, literal types, `type`, `interface`, generics, utility types.
- **Enums**: TypeScript enums usually also create JavaScript code at runtime.

Most TypeScript type annotations disappear when compiled into JavaScript.

---

## 6. TypeScript developer tools

| Name | Meaning | Development purpose |
|---|---|---|
| CLI | Command Line Interface | Run TypeScript-related terminal commands |
| Compiler (`tsc`) | TypeScript compiler | Type checking; generate JavaScript |
| LSP | Language Server Protocol | Editor integration (autocomplete, hover, errors, navigation) |

TypeScript's editor intelligence is often provided by its language service/`tsserver`.

```bash
# Check global TypeScript version
tsc --version

# Check project dependency
npm list typescript

# Install globally
npm install -g typescript

# Strictly check the included examples without generating JS
tsc --noEmit --strict --target ES2020 typescript-revision.ts

# Compile and run the examples
tsc --target ES2020 --module commonjs typescript-revision.ts
node typescript-revision.js
```

---

## 7. Quick revision order

1. **Basics**: primitives, arrays, objects, functions.
2. **Safety**: `any`, `unknown`, `never`, `void`.
3. **Combinations**: union, intersection, tuple, literal, enum.
4. **Reusable types**: `type`, `interface`, generics.
5. **Core utilities**: `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`.
6. **Other utilities**: Learn as you encounter them in real projects.

**Memory cues:** `|` means **either**; `&` means **both**. `Pick` keeps properties; `Omit` removes them from a *type*. `Record` defines object keys and their value types. `unknown` requires checking; `never` is impossible.
