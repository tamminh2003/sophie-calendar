// All api related to shifts reading and manipulation
require('dotenv').config();

const _Date = require('date-fns');
const _Timezone = require('date-fns-tz');
const mongoose = require('mongoose');
const models = require('../models/');

const api = {
  post: async function (req, res, next) {
    console.log("Processing POST /api/shifts/");
    try {
      const { shiftType } = req.body;
      const datetime = new Date(req.body.date);
      const shift = new models.Shift({ datetime, title: "Shift", desc: "This is a shift", shiftType });

      await shift.save()
      res.status(200).json({ "data": { "id": shift._id } });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error");
    }
  },

  get: async function (req, res, next) {
    console.log("Processing GET /api/shifts/");
    let shift;
    try {

      if (req.params.id && req.params.id.length == 8) { // get specific date
        let id = req.params.id;
        let date = id.substring(0, 4) + '-' + id.substring(4, 6) + '-' + id.substring(6, 8);
        shift = await models.Event.find({ date, __t: "Shift" });
        res.status(200).json({ "data": shift });
      }

      else if (req.params.id && req.params.id.length == 6) { // get dates in month
        const id = req.params.id;
        const monthStart = new Date(id.substring(0, 4) + '-' + id.substring(4, 6) + '-01');
        const dates = getDaysInMonth(monthStart);
        console.log("DEBUG");
        console.log(models.Event);
        shift = await models.Shift.find({ "date": { $gte: dates[0], $lte: dates[dates.length - 1] } });
        res.status(200).json({ "data": shift });
      }

    } catch (err) {
      console.error(err);
      res.status(500).send("Error");
    }

  },

  delete: async function (req, res, next) {
    console.log("Processing DELETE /api/shifts/");
    const datetime = new Date(req.body.date);
    try {
      await models.Shift.findOneAndDelete({ datetime });
      res.status(200).send("Deleted");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error");
    }
  }

}

function getDaysInMonth(inputDate) {
  const monthDates = [];
  const monthStart = _Date.startOfMonth(inputDate);
  const monthEnd = _Date.lastDayOfMonth(monthStart);
  monthDates.push(monthStart);
  let date = _Date.addDays(monthStart, 1);
  while ((_Date.compareAsc(date, monthEnd) !== 1 || _Date.getDay(date) !== 0)) {
    monthDates.push(date);
    date = _Date.addDays(date, 1);
  }
  monthDates.push(date);
  date = _Date.addDays(monthStart, -1);
  while (_Date.getDay(date) !== 0) {
    monthDates.unshift(date);
    date = _Date.addDays(date, -1);
  }
  return monthDates;
}

module.exports = api;