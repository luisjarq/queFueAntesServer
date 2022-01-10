const { Error } = require("mongoose");
const Ingredient = require("../models/ingredient");

function getAllIngredients(req, res, next) {
  Ingredient.find().exec((error, movie) => {
    if (error) {
      next(error);
    }
    return res.json(movie);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Ingredient.findById(id).exec((error, movie) => {
    if (!movie) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(movie);
  });
}
function getByName(req, res, next) {
  const name = req.params.name;
  Ingredient.findOne({ name: name })
    .populate("provider")
    .exec((error, food) => {
      if (!food) {
        const notFound = new Error(`[ERROR] name ${name} not found`);
        notFound.status = 404;
        next(notFound);
        return;
      } else if (error) {
        next(error);
        return;
      }
      return res.json(food);
    });
}
async function postIngredient(req, res, next) {
  const newIngredient = new Ingredient({
    name: req.body.name,
    provider: req.body.provider,
    price: req.body.price,
    allergyc: req.body.allergyc,
  });
  newIngredient
    .save()
    .then(() => res.status(201).json(newIngredient))
    .catch((error) => {
      next(error);
    });
}
function putIngredient(req, res, next) {
  const id = req.params.id;
  const newIngredient = new Ingredient({
    name: req.body.name,
    provider: req.body.provider,
    price: req.body.price,
    allergyc: req.body.allergyc,
    _id: id,
  });
  Ingredient.findByIdAndUpdate(id, newIngredient)
    .then(() => res.status(200).json(newIngredient))
    .catch((error) => {
      next(error);
    });
}
function deleteIngredient(req, res, next) {
  const id = req.params.id;
  Ingredient.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Ingredient with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllIngredients,
  getByName,
  getById,
  postIngredient,
  putIngredient,
  deleteIngredient,
};
