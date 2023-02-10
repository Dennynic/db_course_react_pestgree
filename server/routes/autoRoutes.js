const Router = require('express');
const router = new Router();
const autoController = require('./../controllers/autoController');

//router.post('/', autoController.create);
router.get('/', autoController.getAll);

module.exports = router;
