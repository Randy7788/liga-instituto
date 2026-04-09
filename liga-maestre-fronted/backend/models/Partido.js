const mongoose = require('mongoose');

const PartidoSchema = new mongoose.Schema(
  {
    competicion: { type: String, required: true }, // "Fútbol Sala", "Baloncesto", etc.
    equipoLocal: { type: String, required: true },
    equipoVisitante: { type: String, required: true },
    arbitro: { type: String, required: true }, // nombre o id (simple para la tarea)
    fecha: { type: Date, required: true },
    ubicacion: { type: String, required: true },

    // resultado (editable por admin)
    golesLocal: { type: Number, default: null },
    golesVisitante: { type: Number, default: null },
    estado: { type: String, default: 'programado' }, // programado | jugado
  },
  { timestamps: true }
);

module.exports = mongoose.model('Partido', PartidoSchema);
