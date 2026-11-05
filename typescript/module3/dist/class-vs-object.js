class Employee {
    name;
    baseSalary;
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
}
const employee = new Employee("Mir", 22000);
const employee2 = new Employee("Mizan", 24000);
console.log(employee instanceof Employee);
console.log(employee2 instanceof Employee);
export {};
