const Router = require('express');
const router = new Router();
const clientController = require('./../controllers/clientController');

router.post('/', clientController.create);
router.put('/', clientController.update);

router.get('/all', clientController.getAllCars);
router.get('/all/:id', clientController.getClientCar);
router.get('/:id', clientController.getOne);

module.exports = router;
