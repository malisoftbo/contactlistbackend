import { Router } from "express";

import { userAuth } from "../auth/userAuth";
import UserController from "../controllers/user";

const userRouter:Router =Router();

userRouter.post('/create', UserController.Create);
userRouter.post('/login', UserController.Login);
userRouter.post('/update', userAuth, UserController.Update);

export default userRouter;
