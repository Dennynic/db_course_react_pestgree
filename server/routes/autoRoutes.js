const Router = require('express');
const router = new Router();
const autoController = require('./../controllers/autoController');

//router.post('/', autoController.create);
router.get('/', autoController.getAll);
router.post('/', autoController.create);
router.get('/car', autoController.getCar);
router.post('/car', autoController.addCarToClient);
router.get('/car/:id', autoController.getCar);
router.put('/car/:id', autoController.update);
module.exports = router;
