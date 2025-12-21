// routes/sessionRouter.js
const Router = require('express');
const controller = require('../controllers/sessionController');
const router = Router();

router.get('/', controller.getSessions);
router.get('/:id', controller.getSessionById);
router.post('/', controller.addSession);
router.put('/:id/status', controller.updateSessionStatus);
router.delete('/:id', controller.removeSession);
router.post('/:id/cancel', controller.cancelSession);

module.exports = router;
