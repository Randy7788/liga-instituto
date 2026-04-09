const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const partidosRoutes = require('./routes/partidos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/partidos', partidosRoutes);
app.get('/', (req, res) => res.send('API Liga Deportiva OK'));

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));