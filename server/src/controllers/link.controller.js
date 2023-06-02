import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });
    return res.json({
      ok: true,
      links,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

export const getLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    // Buscamos el link
    const link = await Link.findOne({ nanoLink });
    // Verificamos si existe el link
    if (!link) return res.status(404).json({ msg: "No existe el link" });
    // Respuesta
    return res.json({
      ok: true,
      link,
    });
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

// Para un CRUD tradicional
export const getLinkById = async (req, res) => {
  try {
    const { id } = req.params;
    // Buscamos el link
    const link = await Link.findById(id);
    // Verificamos si existe el link
    if (!link)
      return res.status(404).json({
        ok: false,
        msg: "No existe el link",
      });
    // Verificamos si el link le pertenece al usuario
    if (!link.uid.equals(req.uid))
      return res.status(401).json({
        ok: false,
        msg: "No le pertenece ese id",
      });
    // Respuesta
    return res.json({
      ok: true,
      link,
    });
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

export const createLink = async (req, res) => {
  try {
    let { longLink } = req.body;
    // Verificar si el link comienza con https://
    if (!longLink.startsWith("https://")) {
      longLink = "https://" + longLink;
    }
    // Creamos el link
    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
    // Guardamos el link
    const newLink = await link.save();
    // Respuesta
    return res.status(201).json({
      ok: true,
      msg: "Link creado correctamente",
      link: newLink,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    // Buscamos el link
    const link = await Link.findById(id);
    // Verificamos si existe el link
    if (!link)
      return res.status(404).json({
        ok: false,
        msg: "No existe el link",
      });
    // Verificamos si el link le pertenece al usuario
    if (!link.uid.equals(req.uid))
      return res.status(401).json({
        ok: false,
        msg: "No le pertenece ese id",
      });
    // Eliminamos el link
    await link.remove();
    // Respuesta
    return res.json({
      ok: true,
      msg: "Link eliminado correctamente",
    });
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

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { longLink } = req.body;
    // Verificar si el link comienza con https://
    if (!longLink.startsWith("https://")) {
      longLink = "https://" + longLink;
    }
    // Buscamos el link
    const link = await Link.findById(id);
    // Verificamos si existe el link
    if (!link)
      return res.status(404).json({
        ok: false,
        msg: "No existe el link",
      });
    // Verificamos si el link le pertenece al usuario
    if (!link.uid.equals(req.uid))
      return res.status(401).json({
        ok: false,
        msg: "No le pertenece ese id",
      });
    // Actualizamos el link (https://mongoosejs.com/docs/api.html#document_Document-save)
    link.longLink = longLink;
    await link.save();
    // Respuesta
    return res.json({
      ok: true,
      msg: "Link actualizado correctamente",
      link,
    });
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
