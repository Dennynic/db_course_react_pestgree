const { Client } = require('../models');
const sequelize = require('../db');
//const ApiError = require('../error/ApiError');

class ClientController {
  async create(req, res) {
    try {
      const { firstName, lastName, secondName, phone, bDate } = req.body;
      const client = await Client.create({
        firstName,
        lastName,
        secondName,
        phone,
        bDate,
      });
      return res.json(client);
    } catch (error) {
      console.log('Error', error);
    }
  }

  async update(req, res) {
    try {
      const { id, firstName, lastName, secondName, phone, bDate } = req.body;
      const client = await Client.update(
        {
          firstName,
          lastName,
          secondName,
          phone,
          bDate,
        },
        {
          where: {
            id,
          },
        },
      );
      return res.json(client);
    } catch (error) {
      console.log('Error', error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const client = await Client.findOne({
        where: { id },
        //include: [{ model: CarInfo, as: 'car' }],
      });

      return res.json(client);
    } catch (error) {
      console.log('Error:', error);
      //next(ApiError.badRequest(error.message));
    }
  }

  async getClientCar(req, res) {
    let additionalParams = '';
    const id = Number(req.params.id) | null;

    if (id) {
      additionalParams = `WHERE clients.id = ${id}`;
    }

    const request = `SELECT clients.id, clients."firstName", clients."lastName", clients."secondName", clients."bDate", clients."phone",
      case when count(Car) = 0 then '[]' else json_agg(json_build_object('id', Car.id, 'regNumber', Car."regNumber", 'year', Car."year", 'brand', Car."brand", 'model', Car."model" )) end as cars
          FROM clients
      LEFT OUTER JOIN (SELECT autos.id, autos."regNumber", autos."year", auto."brand", auto."model", auto_clients."clientId" FROM auto_clients
              JOIN public.autos ON autos.id  = auto_clients."autoId"
               JOIN (SELECT brand_models.id as id, car_brands."title" as brand, car_models."title" as model
            FROM brand_models 
            JOIN public.car_brands ON car_brands.id = brand_models."carBrandId"
            JOIN public.car_models ON car_models.id = brand_models."carModelId" ) AS auto ON auto.id = autos."brandModelId"
              ) as Car ON clients."id" = Car."clientId"
      ${additionalParams}
      GROUP BY clients.id;`;

    try {
      const clientCar = await sequelize.query(request);

      return res.json(clientCar[0]);
    } catch (error) {
      console.log('Error:', error);
      //next(ApiError.badRequest(error.message));
    }
  }

  async getAllCars(req, res) {
    const request = `
    SELECT clients.id as "clientId", clients."firstName", clients."lastName", clients."secondName", clients."bDate", clients."phone"
, Car."id" as carId, Car."regNumber", Car."year", Car."brand", Car."model"
FROM clients
        
        LEFT OUTER JOIN (SELECT autos.id, autos."regNumber", autos."year", auto."brand", auto."model", auto_clients."clientId" FROM auto_clients
						JOIN public.autos ON autos.id  = auto_clients."autoId"
						 JOIN (SELECT brand_models.id as id, car_brands."title" as brand, car_models."title" as model
          FROM brand_models 
          JOIN public.car_brands ON car_brands.id = brand_models."carBrandId"
          JOIN public.car_models ON car_models.id = brand_models."carModelId" ) AS auto ON auto.id = autos."brandModelId"
						) as Car ON clients."id" = Car."clientId"
        
    `;

    try {
      const clientCar = await sequelize.query(request);

      return res.json(clientCar[0]);
    } catch (error) {
      console.log('Error:', error);
      //next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new ClientController();
