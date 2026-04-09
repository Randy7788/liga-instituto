const express = require('express');
const Partido = require('../models/Partido');

const router = express.Router();

// GET /api/partidos  -> listar todos (admin)
router.get('/', async (req, res) => {
  try {
    const partidos = await Partido.find().sort({ fecha: 1 });
    res.json(partidos);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET /api/partidos/arbitro/:nombre -> listar por árbitro
router.get('/arbitro/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const partidos = await Partido.find({ arbitro: nombre }).sort({ fecha: 1 });
    res.json(partidos);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
// GET /api/partidos/equipo/:nombre
router.get('/equipo/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const partidos = await Partido.find({
      $or: [{ equipoLocal: nombre }, { equipoVisitante: nombre }],
    }).sort({ fecha: 1 });

    res.json(partidos);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
// GET /api/partidos/arbitro/:nombre
router.get('/arbitro/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;

    const partidos = await Partido.find({ arbitro: nombre });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET /api/partidos/equipo/:equipo
router.get('/equipo/:equipo', async (req, res) => {
  const { equipo } = req.params;

  const partidos = await Partido.find({
    $or: [{ local: equipo }, { visitante: equipo }]
  });

  res.json(partidos);
});

// POST /api/partidos -> crear partido (admin)
router.post('/', async (req, res) => {
  try {
    const { competicion, equipoLocal, equipoVisitante, arbitro, fecha, ubicacion } = req.body;

    if (!competicion || !equipoLocal || !equipoVisitante || !arbitro || !fecha || !ubicacion) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const partido = await Partido.create({
      competicion,
      equipoLocal,
      equipoVisitante,
      arbitro,
      fecha,
      ubicacion,
      estado: 'programado',
      golesLocal: null,
      golesVisitante: null,
    });

    res.status(201).json(partido);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// PATCH /api/partidos/:id -> editar (admin)
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Partido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
