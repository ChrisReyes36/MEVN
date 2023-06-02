import { Router } from "express";
import {
  register,
  login,
  infoUser,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
router.get("/protected", requireToken, infoUser);
router.put("/refresh", requireRefreshToken, refreshToken);
router.post("/logout", logout);

export default router;
