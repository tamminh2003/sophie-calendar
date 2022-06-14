import * as _Date from 'date-fns';
import { useState, useEffect } from 'react';
import * as Comps from '../components';
import { fetchShifts, getDaysInMonth } from '../utils';


export default function Month(props) {
  const date = props.date;
  const calendarDates = getDaysInMonth(date);

  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    (async () => {
      setShifts(await fetchShifts(date));
    })();
  }, []);

  const listOfDays = generateListOfDays(calendarDates);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-blue-600">{_Date.format(date, 'LLLL')} - {_Date.format(date, 'yyyy')}</h1>
      <div id='calendar-container' className='grid grid-cols-7 gap-4 mt-4'>
        <div className='border border-solid border-black'>Monday</div>
        <div className='border border-solid border-black'>Tuesday</div>
        <div className='border border-solid border-black'>Wednesday</div>
        <div className='border border-solid border-black'>Thursday</div>
        <div className='border border-solid border-black'>Friday</div>
        <div className='border border-solid border-black'>Saturday</div>
        <div className='border border-solid border-black'>Sunday</div>
        {listOfDays}
      </div>
    </>
  );

  /**
   * Generate list of day components in a month
   */
  function generateListOfDays(calendarDates) {
    return calendarDates.map(day => {
      const shift = (shifts.filter(each => {
        const shiftDate = new Date(each.date);
        return _Date.getDate(shiftDate) === _Date.getDate(day) && _Date.getMonth(shiftDate) === _Date.getMonth(day);
      }))[0];
      return (
        <Comps.Day key={day.valueOf()} date={date} day={day} shift={shift} setShifts={setShifts} />
      );
    });
  }

}
