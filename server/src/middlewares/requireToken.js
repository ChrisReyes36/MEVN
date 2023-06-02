import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    // Obtener token de las cabeceras
    let token = req.headers?.authorization;
    // Si no hay token, lanzar error
    if (!token) throw new Error("No Bearer");
    // Si hay token, verificarlo
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({
      ok: false,
      message: tokenVerificationErrors[error.message] || error.message,
    });
  }
};
