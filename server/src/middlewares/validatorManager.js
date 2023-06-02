import axios from "axios";
import { body } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const paramLinkValidator = [
  param("id", "Formato no válido (expressValidator)")
    .trim()
    .notEmpty()
    .escape(),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body("longLink", "Formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("https://")) {
          value = "https://" + value;
        }
        await axios.get(value);
        return value;
      } catch (error) {
        throw new Error("Not found longlink 404");
      }
    }),
  validationResultExpress,
];

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
