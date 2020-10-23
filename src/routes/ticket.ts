import { Router } from "express";

import TicketController from "../controllers/ticket";

const userRouter:Router =Router();

userRouter.post('/create', TicketController.Create);
userRouter.post('/update', TicketController.Update);
//userRouter.post('login', Login);

export default userRouter;
