import * as _Date from 'date-fns';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import * as Comps from '../components';
import { fetchShifts, getDaysInMonth, getStyle, randomIcon } from '../utils';

export default function Month(props) {
  const date = props.date;
  const calendarDates = getDaysInMonth(date);

  const isDesktop = useMediaQuery({
    query: "(min-width:1200px)"
  });

  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    (async () => {
      setShifts(await fetchShifts(date));
    })();
  }, []);

  const style = {
    size: "h-fit",
    layout: "grid grid-cols-7 gap-0 align-start justify-start"
  }

  return (
    <>
      <h1 className="mt-4 text-center text-3xl font-bold text-slate-100">{_Date.format(date, 'LLLL')}  {_Date.format(date, 'yyyy')}</h1>
      <div id="Month" className={getStyle(style)}>
        <DaysOfWeek />
        <ListOfDays calendarDates={calendarDates} />
      </div>
    </>
  );

  /**
   * Generate Days of Week Column Header
   */
  function DaysOfWeek() {
    const refDate = new Date("2022-06-13");
    const daysOfWeek = new Array(7).fill(0).map((day, index) => _Date.addDays(refDate, index)).map((day, index) => {
      const style = {
        size: "",
        layout: "items-center justify-center flex",
        font: "font-bold",
        margin: "mt-4"
      };

      return (
        <div key={day}
          className={`${getStyle(style)} ${index === 6 ? 'text-fuchsia-300' : 'text-white'}`}
        >
          {_Date.format(day, isDesktop ? "EEEE" : "EE").toUpperCase()}
        </div >
      )
    });
    return (<>{daysOfWeek}</>);
  }

  /**
  * Generate list of day components in a month
  */
  function ListOfDays(props) {
    const { calendarDates } = props;
    const listOfDays = calendarDates.map(day => {
      const shift = (shifts.filter(each => {
        const shiftDate = new Date(each.datetime);
        return _Date.getDate(shiftDate) === _Date.getDate(day) && _Date.getMonth(shiftDate) === _Date.getMonth(day);
      }))[0];
      return (
        <Comps.Day key={day.valueOf()} date={date} day={day} shift={shift} setShifts={setShifts} />
      );
    });
    return (<>{listOfDays}</>)
  }

}
