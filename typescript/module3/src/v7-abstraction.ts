//* Abstraction: every employee must define how their pay is calculated.

abstract class Employee {
  constructor(
    public name: string,
    protected _baseSalary: number,
  ) {}

  get baseSalary(): number {
    return this._baseSalary;
  }

  set baseSalary(newSalary: number) {
    if (newSalary < 0) {
      throw new Error("Salary cannot be negative value");
    }
    this._baseSalary = newSalary;
  }

  abstract calculatePay(): number;
  // abstract getResources(): string[];
  // abstract registerEntryTime(): string;
}

class Manager extends Employee {
  calculatePay() {
    return this.baseSalary + 5000;
  }
}

class Developer extends Employee {
  calculatePay() {
    return this.baseSalary + 3000;
  }
}
