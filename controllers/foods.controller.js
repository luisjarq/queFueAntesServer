const { Error } = require("mongoose");
const Food = require("../models/food");

function getAllFoods(req, res, next) {
  Food.find().exec((error, food) => {
    if (error) {
      next(error);
    }
    return res.json(food);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Food.findById(id).exec((error, food) => {
    if (!food) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
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
function getByName(req, res, next) {
  const name = req.params.name;
  Food.findOne({ name: name })
    .populate("ingredients")
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
async function postFood(req, res, next) {
  const newFood = new Food({
    name: req.body.name,
    ingredients: req.body.ingredients,
    price: req.body.price,
  });
  newFood
    .save()
    .then(() => res.status(201).json(newFood))
    .catch((error) => {
      next(error);
    });
}
function putFood(req, res, next) {
  const id = req.params.id;
  const newFood = new Food({
    name: req.body.name,
    ingredients: req.body.ingredients,
    price: req.body.price,
    _id: id,
  });
  Food.findByIdAndUpdate(id, newFood)
    .then(() => res.status(200).json(newFood))
    .catch((error) => {
      next(error);
    });
}
function deleteFood(req, res, next) {
  const id = req.params.id;
  Food.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Food with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllFoods,
  getByName,
  getById,
  postFood,
  putFood,
  deleteFood,
};
