const Router = require('express');
const router = new Router();
const reportController = require('./../controllers/reportController');

router.get('/:id', reportController.report);

module.exports = router;
