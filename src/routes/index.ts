import { Router } from "express";
import userRouter from "./user";
import ticketRouter from "./ticket";
import contactRouter from "./contact"

const routes:Router =Router();

/*here add all new routes that are createdG on the project*/
routes.use("/user",userRouter);
routes.use("/ticket",ticketRouter);
routes.use("/contact",contactRouter);

export default routes;
