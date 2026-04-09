const express = require('express');
const User = require('../models/User');

const router = express.Router();

/**
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Password incorrecto' });
    }

   
    return res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol, 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
