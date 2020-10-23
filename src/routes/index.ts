import { Router } from "express";
import userRouter from "./user";
const routes:Router =Router();

/*here add all new routes that are createdG on the project*/
routes.use(userRouter);

export default routes;