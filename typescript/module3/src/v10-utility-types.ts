//* Utility Types

//* Partial

interface User {
  id: string;
  name: string;
  email: string;
}

const updateProfile = (id: string, date: Partial<User>) => {
  // some backend logic
};

updateProfile("asdfas", { name: "Mizan" });

//* Required

interface Config {
  apiKey?: string;
  timeout?: number;
}

const initialize = (config: Required<Config>) => {
  // some logic
};

initialize({ apiKey: "asdfasdfa", timeout: 30000 });

//* Pick

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

type ProductPreview = Pick<Product, "name" | "description">;

const preview: ProductPreview = {
  name: "ABC",
  description: "EFG",
};

//* Omit

interface Employee {
  id: number;
  name: string;
  salary: number;
  nid: string;
}

type PublicEmployee = Omit<Employee, "salary" | "nid">;

const directoryEntry: PublicEmployee = {
  id: 42,
  name: "Bob",
};

//* Record

type Environment = "development" | "staging" | "production";

const apiUrls: Record<Environment, string> = {
  development: "http://localhost:3000",
  staging: "https://staging.api.com",
  production: "https://api.com",
};
