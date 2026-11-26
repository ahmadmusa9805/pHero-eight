import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
const app: Application = express();
// "postgresql://neondb_owner:npg_qpcQ4kxjZ2CM@ep-dark-pine-biluzqzb.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
// connectionString: "postgresql://neondb_owner:npg_qpcQ4kxjZ2CM@ep-dark-pine-biluzqzb-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute)
app.use("/api/v1/profiles", profileRoute)
app.use("/api/v1/auth", authRoute)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root url",
    author: "PH",
  });
});

export default app
