const { CarBrand } = require('../models');
const ApiError = require('../error/ApiError');

//const ApiError = require('../error/ApiError');

class BrandController {
  async create(req, res, next) {
    const { title } = req.body;
    try{
      const carBrand = await CarBrand.create({ title })
      return res.json(carBrand);
    }
    catch(error){
      next(ApiError.badRequest(error));
    };
  }

  async getAll(req, res) {
    const carBrand = await CarBrand.findAll();
    return res.json(carBrand);
  }
}

module.exports = new BrandController();
