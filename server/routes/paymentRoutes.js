const Router = require('express');
const router = new Router();
const paymentRouter = require('./../controllers/paymentController');

router.post('/', paymentRouter.create);
router.get('/', paymentRouter.getAll);

module.exports = router;
