const Router = require('express');
const router = new Router();
const modelRouter = require('./../controllers/modelController');

router.post('/', modelRouter.create);
router.get('/', modelRouter.getAll);


module.exports = router;