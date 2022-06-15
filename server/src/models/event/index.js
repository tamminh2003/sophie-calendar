const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    datetime: {
      type: Date,
      required: true,
    },
    desc: {
      type: String
    },
    reminder: {
      type: Boolean
    },
    reminderDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;