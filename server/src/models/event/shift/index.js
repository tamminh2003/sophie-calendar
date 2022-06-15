const mongoose = require('mongoose');
const Event = require('../');

const ShiftSchema = new mongoose.Schema(
  {
    shiftType: {
      type: String,
      required: true,
      enum: ["night", "morning", "am", "pm"]
    }
  }
);

const Shift = Event.discriminator('Shift', ShiftSchema);

module.exports = Shift;