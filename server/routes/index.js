const Router = require('express');
const router = new Router();

const clientRouter = require('./clientRoutes');

router.use('/client', clientRouter);

module.exports = router;
