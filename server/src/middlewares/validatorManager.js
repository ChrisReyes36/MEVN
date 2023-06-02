import { body } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const bodyRegisterValidator = [
  body("email", "El email no es válido.").trim().isEmail().normalizeEmail(),
  body("password", "La contraseña debe tener al menos 6 caracteres.")
    .trim()
    .isLength({ min: 6 }),
  body("repassword", "Las contraseñas no coinciden.").custom(
    (value, { req }) => value === req.body.password
  ),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "El email no es válido.").trim().isEmail().normalizeEmail(),
  body("password", "La contraseña debe tener al menos 6 caracteres.")
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress,
];
