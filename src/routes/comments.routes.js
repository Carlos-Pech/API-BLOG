import { Router } from "express";
import * as verify from "../middleware/authJwt.js";
import fileUpload from "express-fileupload";

import * as controllerC from "../controllers/comments.controller.js";

const router = Router();

router.post("/post/comment",verify.verifyToken, controllerC.addComment);
router.get("/get/comments/:postId",verify.verifyToken,controllerC.getComments);
export default router;