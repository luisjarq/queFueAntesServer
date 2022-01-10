const { Error } = require("mongoose");
const Menu = require("../models/menu");

function getAllMenus(req, res, next) {
  Menu.find().exec((error, menu) => {
    if (error) {
      next(error);
    }
    return res.json(menu);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Menu.findById(id).exec((error, menu) => {
    if (!menu) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(menu);
  });
}
function getByName(req, res, next) {
  const name = req.params.name;
  Menu.findOne({ name: name })
    .populate("foods")
    .exec((error, menu) => {
      if (!menu) {
        const notFound = new Error(`[ERROR] name ${name} not found`);
        notFound.status = 404;
        next(notFound);
        return;
      } else if (error) {
        next(error);
        return;
      }
      return res.json(menu);
    });
}
async function postMenu(req, res, next) {
  const newMenu = new Menu({
    name: req.body.name,
    foods: req.body.foods || [],
    price: req.body.price,
  });
  newMenu
    .save()
    .then(() => res.status(201).json(newMenu))
    .catch((error) => {
      next(error);
    });
}
function putMenu(req, res, next) {
  const id = req.params.id;
  const newMenu = new Menu({
    name: req.body.name,
    foods: req.body.foods || [],
    price: req.body.price,
    _id: id,
  });
  Menu.findByIdAndUpdate(id, newMenu)
    .then(() => res.status(200).json(newMenu))
    .catch((error) => {
      next(error);
    });
}
function deleteMenu(req, res, next) {
  const id = req.params.id;
  Menu.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Menu with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllMenus,
  getByName,
  getById,
  postMenu,
  putMenu,
  deleteMenu,
};
