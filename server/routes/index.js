const Router = require('express');
const router = new Router();

const clientRouter = require('./clientRoutes');
const autoRouter = require('./autoRoutes');
const brandRouter = require('./brandRoutes');
const modelRouter = require('./modelRoutes');

router.use('/client', clientRouter);
router.use('/auto', autoRouter);
router.use('/brand', brandRouter);
router.use('/model', modelRouter);

module.exports = router;
