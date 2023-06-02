import { tokenVerificationErrors } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
  try {
    // Obtener el token de las cookies
    const refreshTokenCookie = req.cookies.refreshToken;
    // Si no hay token, lanzar error
    if (!refreshTokenCookie) throw new Error("No existe el token");
    // Si hay token, verificarlo
    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      message: tokenVerificationErrors[error.message] || error.message,
    });
  }
};
