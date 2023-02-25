const { Place } = require('../models');

const ApiError = require('../error/ApiError');

class PlaceController {
  async create(req, res, next) {
    try {
      const { price, startDate, isVacant, autoId } = req.body;
      const place = await Place.create({
        price,
        startDate,
        isVacant,
        autoId,
      });
      return res.json(place);
    } catch (error) {
      console.log('Error', error);
      next(ApiError.badRequest(error));
    }
  }

  async getAll(req, res) {
    const place = await Place.findAll();
    return res.json(place);
  }

 
}

module.exports = new PlaceController();
