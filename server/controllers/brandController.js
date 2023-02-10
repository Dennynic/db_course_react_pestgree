const { CarBrand } = require('../models/models');
//const ApiError = require('../error/ApiError');

class BrandController {
  async create(req, res) {
    const { title } = req.body;
    const carBrand = await CarBrand.create({ title });
    return res.json(carBrand);
  }

  async getAll(req, res) {
    const carBrand = await CarBrand.findAll();
    return res.json(carBrand);
  }
}

module.exports= new BrandController();