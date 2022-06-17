import * as _Date from 'date-fns';
import Popup from 'reactjs-popup';
import { fetchShifts, getStyle } from '../utils';

export default function Day(props) {
  const { date, day, shift, setShifts, mode } = props;

  async function handleListClick(e) {
    if (mode === null) return;
    
    if (mode === 'delete') {
      const fetchBody = {
        date: day,
      };
      await fetch("/api/shifts/", {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchBody)
      });
    }
    else {
      const fetchBody = {
        date: day,
        shiftType: mode
      };
      await fetch("/api/shifts/", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchBody)
      });
    }

    setShifts(await fetchShifts(date));
  }

  const style = {
    size: "h-day",
    border: "border rounder-2xl border-transparent",
    font: "font-semibold",
    shadow: "drop-shadow-lg",
    layout: "flex items-center justify-center",
    transform: "active:opacity-50 transform duration-75",
    other: "select-none"
  }

  const shiftTextStyle = {
    position: "absolute bottom-0",
    font: "text-sm font-normal",
    other: "select-none"
  }

  return (
    <div className='day-container select-none' onClick={handleListClick}>

      {shift && shift.shiftType === 'am'
        && <div className={`${getStyle(style)} bg-teal-500 text-slate-200`}>
          {_Date.getDate(day)}
          <div className={getStyle(shiftTextStyle)}>{shift.shiftType.toUpperCase()}</div>
        </div>}

      {shift && shift.shiftType === 'pm'
        && <div className={`${getStyle(style)} bg-purple-500 text-white`}>
          {_Date.getDate(day)}
          <div className={getStyle(shiftTextStyle)}>{shift.shiftType.toUpperCase()}</div>

        </div>}

      {shift && shift.shiftType === 'night'
        && <div className={`${getStyle(style)} bg-indigo-600 text-white`}>
          {_Date.getDate(day)}
          <div className={getStyle(shiftTextStyle)}>{shift.shiftType.toUpperCase()}</div>

        </div>}

      {!shift && <div className={`${getStyle(style)} bg-transparent text-white`}>
        {_Date.getDate(day)}
      </div>}

    </div>
  )
}