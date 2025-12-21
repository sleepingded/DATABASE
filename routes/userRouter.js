// routes/userRouter.js
const Router = require('express');
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/login', controller.login);
router.get('/me', auth, controller.me);

module.exports = router;
