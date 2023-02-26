const { Payment } = require('../models');

const ApiError = require('../error/ApiError');

class PaymentController {
  async create(req, res, next) {
    try {
      const { summ, clientId, paymentDate, placeId } = req.body;
      const place = await Payment.create({
        summ,
        clientId,
        paymentDate,
        placeId,
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

module.exports = new PaymentController();
