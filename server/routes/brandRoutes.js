const Router = require('express');
const router = new Router();
const brandRouter = require('./../controllers/brandController');

router.post('/', brandRouter.create);
router.get('/', brandRouter.getAll);


module.exports = router;