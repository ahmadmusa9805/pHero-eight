import app from "./app";
import config from "./config";
import { initDB } from "./db";

initDB();

const main = () => {
  app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
}


main()