import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { authjwt, verifySignup, userExist, authLimiter } from "../middlewares";

const router = Router();

router.get("/", authLimiter.getsLimit, userCtrl.getUsers);  // solo es para obtener los socios

router.post("/", [  authjwt.verifyToken,
                    authLimiter.amountLimit,
                     authjwt.isAdmin, 
                     verifySignup.validateFields,
                     verifySignup.checkDuplicateEmail,
                    verifySignup.verifyExistedRole], userCtrl.createUser);


router.delete("/:userId",[authjwt.verifyToken, 
                         authLimiter.amountLimit,
                         authjwt.isAdmin], userCtrl.deleteUser);

router.patch("/:userId", [authjwt.verifyToken, userExist,  authLimiter.changePassword], userCtrl.changePassword);


export default router;
