const { Client } = require('../models');
//const ApiError = require('../error/ApiError');

class ClientController {
  async create(req, res) {
    console.log('req', req);
    const { first_name, last_name, second_name, phone, birth_date } = req.body;
    const client = await Client.create({
      first_name,
      last_name,
      second_name,
      phone,
      birth_date,
    });
    return res.json(client);
  }

  async getAll(req, res) {
    const client = await Client.findAll();
    return res.json(client);
  }

  async getOne(req, res, next) {
    console.log('req', req);
    try {
      const { id } = req.params;
      const client = await Client.findOne({
        where: { id },
        //include: [{ model: CarInfo, as: 'car' }],
      });

      return res.json(device);
    } catch (error) {
      console.log('Error:', error);
      //next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new ClientController();
