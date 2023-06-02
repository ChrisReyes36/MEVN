import { User } from "../models/User.js";
import { formatDate } from "../utils/formatDate.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Alternativa buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };
    user = new User({ email, password });
    await user.save();
    // Generar el token JWT
    const { token, expiresIn } = generateToken(user.id);
    // Generar el token de refresco
    generateRefreshToken(user.id, res);
    // Fecha de expiración del token
    const expires = formatDate(expiresIn);
    // Respuesta
    return res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      token,
      expires,
    });
  } catch (error) {
    console.log(error);
    // Error de datos duplicados
    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya está registrado",
      });
    }
    // Error de servidor
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscar el usuario por email
    let user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({
        ok: false,
        msg: "El email no está registrado",
      });
    // Comparar la contraseña
    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    // Generar el token JWT
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);
    // Fecha de expiración del token
    const expires = formatDate(expiresIn);
    // Respuesta
    return res.json({
      ok: true,
      msg: "Logueo realizado correctamente",
      token,
      expires,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({
      ok: true,
      user: {
        email: user.email,
        uid: user.id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    const expires = formatDate(expiresIn);
    return res.json({
      ok: true,
      token,
      expires,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({
    ok: true,
    msg: "Sesión cerrada correctamente",
  });
};
