const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      index: { unique: true }
    },
    shiftType: {
      type: String,
      required: true,
      enum: ["night", "morning", "am", "pm"]
    }
  },
  {
    timestamps: true
  }
);

const Shift = mongoose.model('Shift', ShiftSchema);

module.exports = Shift;