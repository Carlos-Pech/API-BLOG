import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../config.js";

export const token = (id) => {
    const token = jwt.sign({ id: id }, jwtSecretKey, {
        expiresIn: 86400,
    });

    return token;
};



