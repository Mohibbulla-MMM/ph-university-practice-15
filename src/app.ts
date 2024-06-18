import express, { Request, Response } from "express";
// import { StudentRouter } from "./app/module/student/student.router";
// import { UserRouter } from "./app/module/user/user.router";
import cors from "cors";
import globalErrorHandler from "./app/middleWare/globalErrorHandler";
import notFound from "./app/middleWare/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app = express();
// middle ware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use("/api/v1/", router);
// app.use("/api/v1/users", UserRouter);
const test = async (req: Request, res: Response) => {
  // Promise.reject()
  res.send("PH-University server is running ");
};

app.get("/", test);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
