import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    // Buscamos el link
    const link = await Link.findOne({ nanoLink });
    // Verificamos si existe el link
    if (!link)
      return res.status(404).json({
        ok: false,
        msg: "No existe el link",
      });
    // Respuesta
    return res.redirect(link.longLink);
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({
        ok: false,
        msg: "Formato id incorrecto",
      });
    }
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};
