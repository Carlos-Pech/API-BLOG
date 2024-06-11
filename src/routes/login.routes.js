import { Router } from "express";
import * as login from "../controllers/login.controller.js"
import { verifyDuplicateEmail } from "../middleware/verifySignup.js";
import {validateCreateUser}  from "../validators/users.js"

const router = Router();


router.post("/signUpUser",validateCreateUser,verifyDuplicateEmail,login.signUpUser );
router.post("/signInUser", login.sigInUser);



export default router;