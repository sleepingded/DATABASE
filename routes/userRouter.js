// routes/userRouter.js
const Router = require('express');
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/login', controller.login);
router.get('/me', auth, controller.me);

// routes/userRouter.js — дополнение
router.get('/profile', auth, controller.getProfile);


module.exports = router;

