//* Type assertion

//* "as" syntax

type Status = "pending" | "approved" | "rejected";

const someStatus: string = "pending";

const showStatus = (status: Status) => {
  console.log("Your current application status is " + status);
};

showStatus(someStatus as Status);

//* non-null assertion

interface Config {
  port?: number;
}

const config: Config = {
  port: 5000,
};

const currentPort: number = config.port!;
// const currentPort: number = config.port as number;

//* constant assertion

const configuration = {
  port: 8080,
  prefix: "/api/v2",
} as const;
