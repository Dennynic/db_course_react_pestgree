const { CarModel } = require('../models');
const { BrandModel } = require('../models');
const ApiError = require('../error/ApiError');

class ModelController {
  async create(req, res, next) {
    const { title, brandId } = req.body;
    try {
      if (!title || !brandId) {
        throw new Error('Params require ');
      }
      const model = await CarModel.create({ title });

      const modelId = model.dataValues.id;

      const data = await BrandModel.create({
        carBrandId: brandId,
        carModelId: modelId,
      });
      return res.json(data);
    } catch (error) {
      next(ApiError.badRequest('Bad params'));
    }

    //return res.json(carModel);
  }

  async getAll(req, res) {
    const carModel = await CarModel.findAll();
    return res.json(carModel);
  }
}

module.exports = new ModelController();
