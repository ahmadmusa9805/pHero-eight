# TypeScript — Module 1 (Videos 1–10)

> Beginner-friendly revision notes | From why TypeScript exists to objects, types, and interfaces.

## Quick Summary — Read This First

JavaScript is a **dynamically typed** language: variables can hold values of different types, and some type-related mistakes appear only when the code runs. **TypeScript**, developed by Microsoft, is a **superset of JavaScript** that adds **static type checking**. It helps developers catch many type mistakes while coding, improves autocomplete, and makes larger projects easier to maintain. TypeScript does not eliminate every runtime error.

We write code in `.ts` files using types such as `string`, `number`, and `boolean`. Types can be **explicit** (we write them) or **inferred** (TypeScript figures them out). VS Code's TypeScript language service highlights problems while we work. The **TypeScript compiler (`tsc`)** checks code and converts it into JavaScript, because browsers and Node.js normally execute JavaScript. The compiler removes TypeScript-only type information; type checking does not continue automatically at runtime.

For development, we commonly use **Node.js**, **npm**, **TypeScript**, and **VS Code**. The `tsconfig.json` file controls compiler settings such as source folder (`rootDir`), output folder (`outDir`), JavaScript target, and strict checking. We can describe collections using **arrays** (same element type) or **tuples** (specific types at specific positions). `readonly` helps prevent accidental changes through a typed reference.

TypeScript also checks **functions**: parameters can be required, optional (`?`), or have default values; `void` describes a function with no useful return value. **Rest parameters** (`...args`) collect multiple arguments, and a tuple rest type can require a specific set of arguments. For structured data, we use **object types**, **type aliases (`type`)**, and **interfaces (`interface`)** to describe and reuse shapes. Both `type` and `interface` can compose object structures; type aliases additionally support unions and primitive aliases.

**Remember the flow:** Write TypeScript → get editor feedback → run `tsc` to type-check/compile → run the generated JavaScript. **Goal:** make JavaScript code easier to understand, safer to change, and simpler to maintain.

---

## V1. Why Do We Need TypeScript?

JavaScript uses dynamic typing, so type mistakes can remain hidden until runtime. TypeScript provides static checks during development and helps catch many of these mistakes earlier.

- **JavaScript:** A variable may hold different types over time.
- **TypeScript:** Checks whether values match the types expected by the code.
- **Benefits:** Earlier feedback, autocomplete, readability, and maintainability.
- **Limit:** TypeScript cannot guarantee error-free runtime behavior.

## V2. What Is TypeScript at Its Core?

TypeScript is Microsoft's programming language built on JavaScript. It adds a type system and developer tooling, then normally compiles to JavaScript.

- **Superset:** Valid JavaScript syntax is valid TypeScript syntax.
- **Type annotations:** Describe expected values and structures.
- **Compiler (`tsc`):** Checks types and emits JavaScript.
- **CLI:** Runs tools from the command line.
- **Language service:** Supports editor error hints, autocomplete, and navigation.

## V3. How TypeScript Works Under the Hood

The editor helps identify possible issues as you write. The compiler checks types and generates JavaScript; the runtime executes that JavaScript, not the erased TypeScript types.

- **Flow:** `.ts` source → TypeScript checks/compilation → `.js` output → browser or Node.js.
- **Type errors:** The compiler may still emit JS unless configured otherwise (`noEmitOnError`).
- **LSP:** Language Server Protocol is a standard for editor–language-server communication, **not** a separate tool automatically installed with TypeScript.

## V4. Development Environment Setup

Install a code editor and the tools needed to compile TypeScript. Node.js and npm are typical for project setup, while NVM is optional.

- **Node.js:** Runs JavaScript outside browsers and supports development tools.
- **npm:** Installs dependencies.
- **TypeScript:** Provides the compiler.
- **VS Code:** Editor with TypeScript language support.
- **NVM:** Optional Node.js version manager.

```bash
mkdir typescript-practice
cd typescript-practice
npm init -y
npm install --save-dev typescript
npx tsc --init
```

## V5. Basic Types in TypeScript

Types describe expected values. TypeScript can infer many types without explicit annotations.

- **Basic types:** `string`, `number`, `boolean`, `bigint`, `symbol`.
- **Explicit:** `let age: number = 25;`
- **Inferred:** `let age = 25;` (TypeScript infers `number`).
- **Type mismatch:** `age = "twenty-five";` produces a type error.
- **Tip:** Prefer inference when the type is obvious; avoid unnecessary `any`.

## V6. `tsconfig.json` and Compilation

`tsconfig.json` configures how the TypeScript project is checked and compiled. Generated `.js` files are used by browsers or Node.js.

- **`rootDir`:** TypeScript source directory, such as `src`.
- **`outDir`:** Generated JavaScript directory, such as `dist`.
- **`target`:** JavaScript language version to emit.
- **`strict`:** Enables stronger type checks.
- **`npx tsc`:** Compile using project settings.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src"]
}
```

## V7. Arrays, Tuples, and `readonly`

An array holds multiple elements of an expected type. A tuple specifies the type at each position. `readonly` limits modification through that reference.

- **Array:** `number[]` or `Array<number>`.
- **Generic syntax:** `Array<T>` specifies the element type using a type parameter.
- **Tuple:** `[string, number]` specifies the first and second element types.
- **Readonly array:** `readonly number[]` prevents `push()` and direct assignments through that reference.
- **Parameter:** Named input in a function definition; **argument:** Value passed when calling it.

```ts
const scores: number[] = [10, 20];
const person: [string, number] = ["Musa", 25];
const fixed: readonly number[] = [10, 20];
```

## V8. Optional, Default Parameters, and `void`

Function parameters can be required, optional, or assigned default values. TypeScript also checks return types.

- **Required:** Must be supplied (unless other rules apply).
- **Optional (`?`):** May be omitted; its value can be `undefined`.
- **Default:** Uses a fallback when omitted or explicitly `undefined`.
- **`void`:** No useful return value.
- **Order:** Required parameters cannot follow optional parameters; default-initialized parameters can appear earlier, but callers may need to pass `undefined`.

```ts
function greet(name: string = "Guest"): void {
  console.log(`Hello, ${name}`);
}
greet();       // Hello, Guest
greet("Musa"); // Hello, Musa
```

## V9. Rest Parameters in Functions

Rest parameters gather remaining arguments into an array. A tuple rest parameter can enforce specific argument positions and types.

- **Syntax:** `...numbers: number[]`.
- **Placement:** Rest parameters must be last.
- **Flexible arguments:** `number[]` accepts zero or more numbers.
- **Fixed shape:** `...[string, number]` requires a string followed by a number.
- **Destructuring:** Extract values from arrays or tuples inside functions.

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(10, 20, 30); // 60
```

## V10. Objects, Type Aliases, and Interfaces

Objects store related values as properties. Object types, aliases, and interfaces describe which properties are expected so the same structure can be reused.

- **Object type:** `{ name: string; age: number }`.
- **Type alias:** `type User = ...` names a reusable type; also supports unions, tuples, and primitives.
- **Interface:** `interface User { ... }` describes object shapes and supports `extends`.
- **Composition:** Type aliases can use `&` (intersection); interfaces can extend other interfaces or suitable object types.
- **Difference:** Interfaces support declaration merging; type aliases do not.
- **Separation of concerns:** Organize distinct responsibilities and reusable models rather than repeating definitions.

```ts
type Address = { city: string };

interface User {
  name: string;
  age: number;
  address: Address;
}

const user: User = {
  name: "Musa",
  age: 25,
  address: { city: "Dhaka" }
};
```

---

## Five Things to Remember

1. **TypeScript = JavaScript plus static type checking.**
2. **Types can be explicit or inferred.**
3. **`tsc` checks TypeScript and generates JavaScript.**
4. **Arrays, tuples, and function parameter types make data expectations clear.**
5. **`type` and `interface` make data structures reusable and maintainable.**

**Practice idea:** Define a `User` interface, create an array of users, and write a typed function that prints each user's name.
