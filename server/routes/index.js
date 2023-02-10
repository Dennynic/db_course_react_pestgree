const Router = require('express');
const router = new Router();

const clientRouter = require('./clientRoutes');
const autoRouter = require('./autoRoutes');

router.use('/client', clientRouter);
router.use('/auto', autoRouter);

module.exports = router;
