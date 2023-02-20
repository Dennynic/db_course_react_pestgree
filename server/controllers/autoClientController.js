// const uuid = require('uuid');
// const path = require('path');
// const { Device, DeviceInfo } = require('../models/models');
// const ApiError = require('../error/ApiError');
// const defaultLimit = process.env.DEFAULT_LIMIT || 5;

class DeviceController {
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
  //     console.log('Error', error);
  //     next(ApiError.badRequest(error.message));
  //   }
  // }

  // async getAll(req, res, next) {
  //   try {
  //     let { brandId, typeId, limit, page } = req.query;
  //     page = page || 1;
  //     limit = limit || defaultLimit;
  //     let offset = page * limit - limit;
  //     const params = { limit, offset };

  //     let devices;

  //     if (!brandId && !typeId) {
  //       devices = await Device.findAndCountAll({ ...params });
  //     }

  //     if (brandId && !typeId) {
  //       devices = await Device.findAndCountAll({
  //         where: { brandId },
  //         ...params,
  //       });
  //     }

  //     if (!brandId && typeId) {
  //       devices = await Device.findAndCountAll({
  //         where: { typeId },
  //         ...params,
  //       });
  //     }

  //     if (brandId && typeId) {
  //       devices = await Device.findAndCountAll({
  //         where: { brandId, typeId },
  //         ...params,
  //       });
  //     }

  //     return res.json(devices);
  //   } catch (error) {
  //     next(ApiError.badRequest(error.message));
  //   }
  // }

  // async getOne(req, res, next) {
  //   console.log('req', req);
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

module.exports = new DeviceController();
