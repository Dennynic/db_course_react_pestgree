const { CarModel } = require('../models/models');
//const ApiError = require('../error/ApiError');

class ModelController {
  async create(req, res) {
    const { title } = req.body;
    const carModel = await CarModel.create({ title });
    return res.json(carModel);
  }

  async getAll(req, res) {
    const carModel = await CarModel.findAll();
    return res.json(carModel);
  }
}

module.exports = new ModelController();