//* Inheritance: a Manager is an Employee with an additional responsibility.
class Employee {
    name;
    _baseSalary;
    constructor(name, _baseSalary) {
        this.name = name;
        this._baseSalary = _baseSalary;
    }
    // get baseSalary(): number {
    //   return this._baseSalary;
    // }
    set baseSalary(newSalary) {
        if (newSalary < 0) {
            throw new Error("Salary cannot be negative value");
        }
        this._baseSalary = newSalary;
    }
    describe() {
        return `${this.name} earns ${this.baseSalary}`;
    }
}
class Manager extends Employee {
    teamMemberCount;
    // teamMemberCount: number;
    // constructor(name: string, _baseSalary: number, teamMemberCount: number) {
    //   super(name, _baseSalary);
    //   this.teamMemberCount = teamMemberCount;
    // }
    constructor(name, _baseSalary, teamMemberCount) {
        super(name, _baseSalary);
        this.teamMemberCount = teamMemberCount;
    }
    describeWork() {
        return `${this.name} manages ${this.teamMemberCount} people`;
    }
    describeManager() {
        return `${this.name} earns ${this._baseSalary}`;
    }
}
const employee = new Employee("Mir", 22000);
console.log(employee.describe());
const manager = new Manager("Mizan", 24000, 20);
console.log(manager.describeWork());
export {};
