const Router = require('express');
const router = new Router();
const placeRouter = require('./../controllers/placeController');

router.post('/', placeRouter.create);
router.get('/', placeRouter.getAll);

module.exports = router;
