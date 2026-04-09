const express = require('express');
const User = require('../models/User');

const router = express.Router();

/**
 * GET /api/users
 * Listar usuarios
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .select('_id nombre email rol createdAt updatedAt')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /api/users
 * Crear usuario
 */
router.post('/', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({
      nombre,
      email,
      password,
      rol: rol ?? 'user',
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
