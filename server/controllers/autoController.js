const { Auto, Place, AutoClient, BrandModel } = require('../models');
const sequelize = require('../db');
const ApiError = require('../error/ApiError');

class AutoController {
  async create(req, res, next) {
    const {
      regNumber,
      year,
      carBrandId,
      startDate,
      carModelId,
      place,
      clientId,
    } = req.body;

    const brandId = `SELECT id FROM brand_models WHERE brand_models."carBrandId" = ${carBrandId} AND brand_models."carModelId" = ${carModelId}`;

    try {
      const [carModel] = await sequelize.query(brandId);
      const brandModelId = carModel[0];

      const car = await Auto.create({
        regNumber,
        year,
        brandModelId: brandModelId.id,
      });
      const carId = car.dataValues.id;

      const result = await sequelize.transaction(async t => {
        const placeId = await Place.update(
          { autoId: carId, isVacant: false, startDate },
          { where: { id: place } },
          { transaction: t },
        );
        const user = await AutoClient.create(
          { autoId: carId, clientId },
          { transaction: t },
        );
        return { carModel, placeId, user };
      });

      return res.json(result);
    } catch (error) {
      console.log('Error', error);
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    const query = `
    SELECT car_brands.id as brandId, car_brands.title as brand, case when count(car_models) = 0 then '[]' else json_agg(to_json(car_models)) end as models
    FROM car_brands
    LEFT JOIN brand_models ON brand_models."carBrandId" = car_brands.id
    LEFT JOIN car_models ON car_models.id = brand_models."carModelId"
    GROUP BY car_brands.id
    `;
    try {
      let carModel = await sequelize.query(query);

      return res.json(carModel);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async update(req, res, next) {
    const { regNumber, year, carBrandId, carModelId, place, startDate } =
      req.body;
    const { id } = req.params;

    const query = `UPDATE autos SET "regNumber" = '${regNumber}', "year" = ${year},
     "brandModelId" = (SELECT id FROM brand_models WHERE brand_models."carBrandId" = ${carBrandId} AND brand_models."carModelId" = ${carModelId})
    WHERE autos.id = ${id};
    UPDATE places SET "autoId" = null, "isVacant" = true, "startDate" = null WHERE places."autoId" = ${id};
    UPDATE places SET "autoId" = ${id}, "isVacant" = false, "startDate" = '${startDate}'
    WHERE places.id = ${place};
    `;
    try {
      const response = await sequelize.query(query);
      return res.json(response);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getCar(req, res, next) {
    try {
      const { id } = req.params;
      let addParams = ``;
      if (id) {
        addParams = `WHERE autos.id = ${id}`;
      }
      const query = `
      SELECT autos.id, autos."regNumber", autos."year", car_brands."title" as brand, car_models."title" as model FROM autos
      LEFT JOIN brand_models ON brand_models.id = autos."brandModelId"
      LEFT JOIN car_brands ON car_brands.id = brand_models."carBrandId"
      LEFT JOIN car_models ON car_models.id = brand_models."carModelId"
      ${addParams}
      `;
      let car = await sequelize.query(query);
      return res.json(car);
    } catch (error) {
      console.log('Error:', error);
      next(ApiError.badRequest(error.message));
    }
  }

  async addCarToClient(req, res, next) {
    try {
      const { clientId, autoId } = req.body;
      const autoClient = await AutoClient.create({ autoId, clientId });
      return autoClient;
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new AutoController();
