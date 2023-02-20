const { BrandModel, CarBrand, CarModel } = require('../models');
const sequelize = require('../db');
//const ApiError = require('../error/ApiError');
//const defaultLimit = process.env.DEFAULT_LIMIT || 5;

class AutoController {
  // async create(req, res, next) {
  //   try {
      
  //     let { title, price, brandId, typeId, info } = req.body;
  //     const { img } = req.files;
      
  //     let fileName = uuid.v4() + '.jpg';
  //     img?.mv(path.resolve(__dirname, '..', 'static', fileName)) || '';

  //     const device = await Device.create({
  //       title,
  //       price,
  //       brandId,
  //       typeId,
  //       img: fileName,
  //     });

  //     if (info) {
  //       info = JSON.parse(info);
  //       info.forEach(item => {
  //         DeviceInfo.create({
  //           title: item.title,
  //           description: item.description,
  //           deviceId: device.id,
  //         });
  //       });
  //     }

  //     return res.json(device);
  //   } catch (error) {
  //     console.log("Error", error);
  //     next(ApiError.badRequest(error.message));
  //   }
  // }

  async getAll(req, res, next) {
    
    const query = `
    SELECT car_brands.id as id,
      car_brands.title,
      jsonb_agg(to_jsonb(car_models)) as models
    FROM brand_models
    JOIN public.car_models ON car_models.id = brand_models."carModelId"
    JOIN public.car_brands ON car_brands.id = brand_models."carBrandId"
    GROUP BY car_brands.id;
    `

    const query2 = `
    SELECT car_brands.id as carId, car_brands.title as brand, case when count(car_models) = 0 then '[]' else json_agg(to_json(car_models)) end as models
    FROM car_brands
    LEFT JOIN brand_models ON brand_models."carBrandId" = car_brands.id
    LEFT JOIN car_models ON car_models.id = brand_models."carModelId"
    GROUP BY car_brands.id
    `
    try {
      //let { brandId, typeId } = req.query;
      // page = page || 1;
      // limit = limit || defaultLimit;
      //let offset = page * limit - limit;
      //const params = { limit, offset };

      let carModel = await sequelize.query(query2);

      // if (!brandId && !typeId) {
      //   devices = await Device.findAndCountAll({ ...params });
      // }

      // if (brandId && !typeId) {
      //   devices = await Device.findAndCountAll({
      //     where: { brandId },
      //     ...params,
      //   });
      // }

      // if (!brandId && typeId) {
      //   devices = await Device.findAndCountAll({
      //     where: { typeId },
      //     ...params,
      //   });
      // }

      // if (brandId && typeId) {
      //   carModel = await BrandModel.findAll();
      // }
      
      return res.json(carModel);
    } catch (error) {
      //next(ApiError.badRequest(error.message));
      console.log("AutoControllerError", error)
    }
  }

  // async getOne(req, res, next) {
  //   console.log("req", req);
  //   try {
  //     const { id } = req.params;
  //     const device = await Device.findOne({
  //       where: { id },
  //       include: [{ model: DeviceInfo, as: 'info' }],
  //     });

  //     return res.json(device);
  //   } catch (error) {
  //     next(ApiError.badRequest(error.message));
  //   }
  // }
}

module.exports = new AutoController();
