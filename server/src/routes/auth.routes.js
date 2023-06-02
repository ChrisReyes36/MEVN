import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);

export default router;
