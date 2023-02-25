const Router = require('express');
const router = new Router();
const autoController = require('./../controllers/autoController');

//router.post('/', autoController.create);
router.get('/', autoController.getAll);
router.post('/', autoController.create);
router.get('/car/:id', autoController.getOne);
router.put('/car/:id', autoController.update);
module.exports = router;
