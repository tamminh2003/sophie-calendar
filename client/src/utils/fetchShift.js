import * as _Date from 'date-fns';

/**
 * Fetching shifts
 */
export default async function fetchShifts(date) {
  const month = _Date.format(date, 'yyyyMM')
  const response = await fetch("http://localhost:4000/api/shifts/" + month);
  const json = await response.json();
  return json.data;
};
