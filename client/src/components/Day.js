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

  const popupStyle = ".popup-arrow { color: rgb(129, 140, 248);}"

  return (
    <div className='border border-solid border-black h-24 day-container'>
      <div>{_Date.getDate(day)}</div>
      <div>{shift?.shiftType.toUpperCase()}</div>
      <Popup trigger={<button className='px-4 button rounded bg-indigo-400 text-slate-100'>Add Shift</button>}
        position={['bottom center']}
        arrow={true}
        closeOnDocumentClick
      >
        <div className='rounded border border-indigo-400 bg-indigo-400 text-slate-100'>
          <style>
            {popupStyle}
          </style>
          <ul className='px-6 cursor-pointer'>
            <li data-value='am' onClick={handleListClick}>AM</li>
            <li data-value='pm' onClick={handleListClick}>PM</li>
            <li data-value='night' onClick={handleListClick}>Night</li>
          </ul>
        </div>
      </Popup>
    </div>
  )
}