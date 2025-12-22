// routes/clientRouter.js
const Router = require('express');
const controller = require('../controllers/clientController');
const router = Router();

router.get('/', controller.getClients);
router.get('/:id', controller.getClientById);
router.post('/', controller.addClient);
router.put('/:id', controller.updateClient);
router.delete('/:id', controller.removeClient);

module.exports = router;