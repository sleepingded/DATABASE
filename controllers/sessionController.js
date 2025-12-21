// controllers/sessionController.js
const pool = require('../db');
const queries = require('../queries');

const getSessions = (req, res) => {
  pool.query(queries.getSessions, (error, results) => {
    if (error) return res.status(500).send(error.message);
    res.status(200).json(results.rows);
  });
};

const getSessionById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getSessionById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Session not found');
    res.status(200).json(results.rows[0]);
  });
};

// вставка через VIEW + INSTEAD OF trigger
const addSession = (req, res) => {
  const {
    service_name,
    trainer_name,
    hall_name,
    start_ts,
    end_ts,
    price,
    status,
  } = req.body;
  pool.query(
    queries.addSessionViaView,
    [service_name, trainer_name, hall_name, start_ts, end_ts, price, status],
    (error) => {
      if (error) return res.status(400).send(error.message);
      res.status(201).send('Session created');
    }
  );
};

const updateSessionStatus = (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  pool.query(queries.getSessionById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Session not found');
    pool.query(queries.updateSessionStatus, [status, id], (error2) => {
      if (error2) return res.status(400).send(error2.message);
      res.status(200).send('Session status updated');
    });
  });
};

const removeSession = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getSessionById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Session not found');
    pool.query(queries.removeSession, [id], (error2) => {
      if (error2) return res.status(400).send(error2.message);
      res.status(200).send('Session deleted');
    });
  });
};

// вызов процедуры отмены занятия
const cancelSession = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.procCancelSession, [id], (error) => {
    if (error) return res.status(400).send(error.message);
    res.status(200).send('Session canceled via procedure');
  });
};

module.exports = {
  getSessions,
  getSessionById,
  addSession,
  updateSessionStatus,
  removeSession,
  cancelSession,
};
