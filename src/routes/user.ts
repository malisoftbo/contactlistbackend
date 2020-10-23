import { Router } from "express";
import { userAuth } from "../auth/userAuth";

import UserController from "../controllers/user";

const userRouter:Router =Router();

//import { Create } from "../controllers/user";

userRouter.post('/create', UserController.Create);
//userRouter.post('login', userAuth, UpdatePassword);
//userRouter.post('login', Login);

export default userRouter;
