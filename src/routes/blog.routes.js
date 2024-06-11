import { Router } from "express";
import fileUpload from "express-fileupload";
import * as verify from "../middleware/authJwt.js";
import * as controllerP from "../controllers/post.controller.js";

const router = Router();

router.post(
    "/post/blog",
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
    }),
    verify.verifyToken,
    controllerP.postBlog
);
router.put(
    "/update/post/:id",
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
    }),
    verify.verifyToken,
    controllerP.updatePost
);

router.get("/getAll/post", verify.verifyToken, controllerP.getAllPost);

router.delete("/delete/post/:id", verify.verifyToken,controllerP.deletePost);


export default router;