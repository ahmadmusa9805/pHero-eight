//* Literal Type

type Status = "pending";
const status: Status = "pending";
console.log(status);

//* Basic Union

type Identity = string | number;
const id: Identity = 245435;
console.log(id);

//* Literal Union

type Role = "user" | "admin" | "manager";
const userRole: Role = "manager";
console.log(userRole);

//* Object Union

type Admin = { id: number; role: "admin"; privileges: string[] };
type Member = { id: number; role: "member"; plans: string[] };

type User = Admin | Member;

const user: User = { id: 123, role: "member", plans: ["abc", "def"] };
