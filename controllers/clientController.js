// controllers/clientController.js
const pool = require('../db');
const queries = require('../queries');

const getClients = (req, res) => {
  pool.query(queries.getClients, (error, results) => {
    if (error) return res.status(500).send(error.message);
    res.status(200).json(results.rows);
  });
};

const getClientById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getClientById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Client not found');
    res.status(200).json(results.rows[0]);
  });
};

const addClient = (req, res) => {
  const { full_name, phone, birth_date } = req.body;
  
  if (!full_name || !phone) {
    return res.status(400).json({ error: 'full_name и phone обязательны' });
  }
  
  pool.query(
    queries.addClient,
    [full_name, phone, birth_date || null],
    (error, results) => {
      if (error) {
        console.error('DB error:', error);
        if (error.code === '23505') {
          return res.status(409).json({ error: 'Клиент с таким телефоном уже существует' });
        }
        return res.status(400).json({ error: error.message });
      }
      // ВОЗВРАЩАЕМ JSON, а не text!
      res.status(201).json({ 
        message: 'Client created', 
        client_id: results.rows[0]?.client_id 
      });
    }
  );
};


const removeClient = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getClientById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Client not found');
    
    pool.query(queries.removeClient, [id], (error2) => {
      if (error2) return res.status(400).send(error2.message);
      res.status(200).send(`Client ${id} deleted`);
    });
  });
};


const updateClient = (req, res) => {
  const id = parseInt(req.params.id);
  const { full_name, phone, birth_date } = req.body;
  pool.query(queries.getClientById, [id], (error, results) => {
    if (error) return res.status(500).send(error.message);
    if (!results.rows.length) return res.status(404).send('Client not found');
    pool.query(
      queries.updateClient,
      [full_name, phone, birth_date, id],
      (error2) => {
        if (error2) return res.status(400).send(error2.message);
        res.status(200).send('Client updated');
      }
    );
  });
};



module.exports = {
  getClients,
  getClientById,
  addClient,
  updateClient,
  removeClient,
};
