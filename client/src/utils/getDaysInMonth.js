import * as _Date from 'date-fns';

/**
* Tạo ra một array những ngày trong tháng
*/
export default function getDaysInMonth(date) {
  const monthDays = [];
  const monthStart = _Date.startOfMonth(date);
  const monthEnd = _Date.lastDayOfMonth(monthStart);
  monthDays.push(monthStart);
  let day = _Date.addDays(monthStart, 1);
  while ((_Date.compareAsc(day, monthEnd) !== 1 || _Date.getDay(day) !== 0)) {
    monthDays.push(day);
    day = _Date.addDays(day, 1);
  }
  monthDays.push(day);
  day = _Date.addDays(monthStart, -1);
  while (_Date.getDay(day) !== 0) {
    monthDays.unshift(day);
    day = _Date.addDays(day, -1);
  }
  return monthDays;
}