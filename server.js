// server.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const clientRoutes = require('./routes/clientRouter');
const sessionRoutes = require('./routes/sessionRouter');
const bookingRoutes = require('./routes/bookingRouter');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// статика
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// простые страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

// API
app.use('/api/clients', clientRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});









const userRoutes = require('./routes/userRouter');
const auth = require('./middleware/auth');

// ...
app.use('/user', userRoutes);

// защищаем главную страницу
app.get('/', auth, (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// login остаётся открытым
app.get('/login', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});
