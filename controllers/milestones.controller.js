const { Error } = require("mongoose");
const Milestone = require("../models/milestone");

function getAllMilestones(req, res, next) {
  Milestone.find().exec((error, milestone) => {
    if (error) {
      next(error);
    }
    return res.json(milestone);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Milestone.findById(id)
    .populate("menus")
    .exec((error, milestone) => {
      if (!milestone) {
        const notFound = new Error(`[ERROR] Id ${id} not found`);
        notFound.status = 404;
        next(notFound);
        return;
      } else if (error) {
        next(error);
        return;
      }
      return res.json(milestone);
    });
}
function getByName(req, res, next) {
  const name = req.params.name;
  Milestone.findOne({ name: name })
    .populate("menus")
    .exec((error, milestone) => {
      if (!milestone) {
        const notFound = new Error(`[ERROR] name ${name} not found`);
        notFound.status = 404;
        next(notFound);
        return;
      } else if (error) {
        next(error);
        return;
      }
      return res.json(milestone);
    });
}
async function postMilestone(req, res, next) {
  const newMilestone = new Milestone({
    name: req.body.name,
    image_urls: req.body.image_urls,
    menus: req.body.menus,
  });
  newMilestone
    .save()
    .then(() => res.status(201).json(newMilestone))
    .catch((error) => {
      next(error);
    });
}
function putMilestone(req, res, next) {
  const id = req.params.id;
  const newMilestone = new Milestone({
    name: req.body.name,
    image_urls: req.body.image_urls,
    menus: req.body.menus,
    _id: id,
  });
  Milestone.findByIdAndUpdate(id, newMilestone)
    .then(() => res.status(200).json(newMilestone))
    .catch((error) => {
      next(error);
    });
}
function deleteMilestone(req, res, next) {
  const id = req.params.id;
  Milestone.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Milestone with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllMilestones,
  getByName,
  getById,
  postMilestone,
  putMilestone,
  deleteMilestone,
};
