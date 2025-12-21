// routes/bookingRouter.js
const Router = require('express');
const controller = require('../controllers/bookingController');
const router = Router();

router.get('/', controller.getBookings);
router.get('/:id', controller.getBookingById);
router.post('/', controller.createBooking);
router.put('/:id/status', controller.updateBookingStatus);
router.delete('/:id', controller.removeBooking);

module.exports = router;
