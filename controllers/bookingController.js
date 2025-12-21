// controllers/bookingController.js
const pool = require('../db');
const queries = require('../queries');

const getBookings = (req, res) => {
  pool.query(queries.getBookings, (error, results) => {
    if (error) return res.status(500).send(error.message);
    res.status(200).json(results.rows);
  });
};

const getBookingById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getBookingById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Booking not found');
    res.status(200).json(results.rows[0]);
  });
};

// создание через stored procedure proc_create_booking
const createBooking = (req, res) => {
  const { client_id, session_id } = req.body;
  pool.query(queries.procCreateBooking, [client_id, session_id], (error) => {
    if (error) return res.status(400).send(error.message);
    res.status(201).send('Booking created via procedure');
  });
};

const updateBookingStatus = (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  pool.query(queries.getBookingById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Booking not found');
    pool.query(queries.updateBookingStatus, [status, id], (error2) => {
      if (error2) return res.status(400).send(error2.message);
      res.status(200).send('Booking status updated');
    });
  });
};

const removeBooking = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getBookingById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Booking not found');
    pool.query(queries.removeBooking, [id], (error2) => {
      if (error2) return res.status(400).send(error2.message);
      res.status(200).send('Booking deleted');
    });
  });
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  removeBooking,
};
