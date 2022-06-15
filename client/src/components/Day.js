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

  const className = "flex h-10 items-center justify-center  border rounded-full font-semibold drop-shadow-lg active:scale-75 transform duration-75";

  return (
    <div className='h-10 w-10 day-container'>

      {shift && shift.shiftType === 'am'
        && <div className={`${className} bg-teal-500 text-slate-200`}>
          {_Date.getDate(day)}
        </div>}
      {shift && shift.shiftType === 'pm'
        && <div className={`${className} bg-purple-500 text-white`}>
          {_Date.getDate(day)}
        </div>}
      {shift && shift.shiftType === 'night'
        && <div className={`${className} bg-indigo-600 text-white`}>
          {_Date.getDate(day)}
        </div>}
      {!shift && <div className={`${className} bg-indigo-200 text-slate-600`}>
        {_Date.getDate(day)}
      </div>}
    </div>
  )
}