const express = require('express');
const router = express.Router();
const { checkAuth } = require('../../middlewares/authMiddlewares');
const { asyncWrapper } = require('../../helpers/asyncWrapper');
const { user: ctrl } = require('../../controllers');
const { checkUpdateData } = require('../../utils/userValidators');
const uploadCloud = require('../../middlewares/userMiddlewares');

router.use(checkAuth);

router.get('/current', asyncWrapper(ctrl.getCurrent));
router.post('/logout', asyncWrapper(ctrl.logout));

router.patch(
  '/info',
  checkUpdateData,
  uploadCloud.single('avatar'),
  asyncWrapper(ctrl.update)
);

module.exports = router;
