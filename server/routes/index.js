const Router = require('express');
const router = new Router();

const clientRouter = require('./clientRoutes');
const autoRouter = require('./autoRoutes');
const brandRouter = require('./brandRoutes');
const modelRouter = require('./modelRoutes');
const placeRouter = require('./placeRoutes');

router.use('/client', clientRouter);
router.use('/auto', autoRouter);
router.use('/brand', brandRouter);
router.use('/model', modelRouter);
router.use('/place', placeRouter);

module.exports = router;
