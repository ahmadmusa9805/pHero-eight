//* Encapsulation: protect a state and change it through methods.

//* Access Modifier
//? public
//? private
//? protected

//? readonly

class Employee {
  constructor(
    public name: string,
    private _baseSalary: number,
  ) {}

  get baseSalary(): number {
    return this._baseSalary;
  }

  getSalaryWithBonus(): number {
    return this._baseSalary + 5000;
  }

  set baseSalary(newSalary: number) {
    if (newSalary < 0) {
      throw new Error("Salary cannot be negative value");
    }
    this._baseSalary = newSalary;
  }
}

const employee = new Employee("Mir", 22000);
const employee2 = new Employee("Mizan", 24000);

console.log(employee.baseSalary);
