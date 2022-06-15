import * as _Date from 'date-fns';
import Popup from 'reactjs-popup';
import { fetchShifts } from '../utils';

export default function Day(props) {
  const { date, day, shift, setShifts } = props;

  async function handleListClick(e) {
    const fetchBody = {
      date: day,
      shiftType: e.target.dataset.value
    };
    await fetch("/api/shifts/", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchBody)
    });

    setShifts(await fetchShifts(date));
  }

  return (
    <div className='h-10 w-10 day-container'>

      {shift && shift.shiftType === 'am'
        && <div className="flex h-10 items-center justify-center  border rounded-full bg-teal-500 text-slate-200 font-semibold">
          {_Date.getDate(day)}
        </div>}
      {shift && shift.shiftType === 'pm'
        && <div className="flex h-10 items-center justify-center  border rounded-full bg-purple-500 text-white font-semibold">
          {_Date.getDate(day)}
        </div>}
      {shift && shift.shiftType === 'night'
        && <div className="flex h-10 items-center justify-center  border rounded-full bg-indigo-600 text-white font-semibold">
          {_Date.getDate(day)}
        </div>}
      {!shift && <div className="flex h-10 items-center justify-center  border rounded-full bg-indigo-200 text-slate-600 font-semibold">
        {_Date.getDate(day)}
      </div>}
    </div>
  )
}