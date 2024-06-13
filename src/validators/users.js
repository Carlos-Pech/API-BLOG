import { check } from "express-validator";
import { validateResult } from "../libs/validateHelpers.js";
import passwordValidator from "password-validator";


const schema = new passwordValidator();
schema
    .is()
    .min(8) // Mínimo 8 caracteres
    .has()
    .uppercase() // Al menos una letra mayúscula
    .has()
    .lowercase() // Al menos una letra minúscula
    .has()
    .digits() // Al menos un dígito
    .has()
    .not()
    .spaces(); // No debe contener espacios

export const validateCreateUser = [
    check("email")
        .exists()
        .withMessage("empty email")
        .isString()
        .withMessage("Debe ser una cadena de texto")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("Campo vacio")
        .isEmail()
        .withMessage("No es Email")
        .isLength({ min: 1, max: 100 })
        .withMessage("Debe tener entre 1 y 100 caraceteres"),
    check("name")
        .exists()
        .withMessage("empty name")
        .isString()
        .withMessage("Debe ser una cadena de texto")
        .trim()
        .notEmpty()
        .withMessage("No puede estar vacío")
        .isLength({ min: 1, max: 20 })
        .withMessage("Debe tener entre 1 y 50 caraceteres"),
    check("password")
        .exists()
        .isString()
        .withMessage("La contraseña debe ser una cadena")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Campo vacío"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];
