// import { Router } from "express";
// import * as verify from "../middleware/authJwt.js";
// import * as controllerP from "../controllers/product.controller.js";
// import fileUpload from "express-fileupload";
// import { validateProduct } from "../validators/product.js";

// const router = Router();

// router.post(
//     "/post/product",
//     [verify.verifyToken, verify.admin_worker],
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "./uploads",
//     }),
//     validateProduct,
//     controllerP.postProduct
// );
// router.get("/getAll/product", controllerP.getAllProduct);
// router.get("/getOne/product/:id", controllerP.getProductById);
// router.put(
//     "/put/product/:id",
//     [verify.verifyToken, verify.admin_worker],
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "./uploads",
//     }),
//     controllerP.updatedProduct
// );

// router.put(
//     "/put/status/product/:id",
//     [verify.verifyToken, verify.admin_worker],
//     controllerP.PutStatusProduct
// );


// // Admin
// router.get(
//     "/getAll/product/admin/:query",
// //    [verify.verifyToken, verify.admin_worker],
//     controllerP.getAllProductAdmin
// );
// router.get(
//     "/getOne/product/admin/:id",
//     [verify.verifyToken, verify.admin_worker],
//     controllerP.getProductByIdAdmin
// );



// export default router;
