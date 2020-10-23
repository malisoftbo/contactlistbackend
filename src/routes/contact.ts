import { Router } from "express";
import { userAuth } from "../auth/userAuth";

import contactController from "../controllers/contact";

const userRouter: Router = Router();

userRouter.post('/create', userAuth, contactController.Create);
userRouter.post('/update', userAuth, contactController.Update);
userRouter.post("/read", userAuth, contactController.Read);
userRouter.post("/delete", userAuth, contactController.Delete);

export default userRouter;
