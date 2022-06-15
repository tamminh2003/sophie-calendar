import './App.css';
import * as Comps from '.';
import * as _Date from 'date-fns';
import React from 'react';
import { useState } from 'react';

function App() {
  const [now, setNow] = useState(new Date());
  const [date, setDate] = useState(_Date.startOfMonth(now));


  function handlePrevClick(e) {
    setDate(_Date.addMonths(date, -1));
  }

  function handleNextClick(e) {
    setDate(_Date.addMonths(date, 1));
  }


  return (
    <div id="App" className="w-screen h-screen">

      <Comps.Month date={date} setDate={setDate} />

      <div class="absolute bottom-60 w-screen">
      <div className="flex justify-center mb-4">
          <button className="text-white mx-4 bg-teal-500 px-4 rounded-full border font-semibold">AM</button>
          <button className="text-white mx-4 bg-purple-500 px-4 rounded-full border font-semibold">PM</button>
          <button className="text-white mx-4 bg-indigo-600 px-4 rounded-full border font-semibold">Night</button>
        </div>
        <div className="flex justify-center mb-4">
          <button className="text-white mx-4 bg-sky-400 px-4 rounded-full border font-semibold" onClick={handlePrevClick}>Prev</button>
          <button className="text-white mx-4 bg-sky-400 px-4 rounded-full border font-semibold" onClick={handleNextClick}>Next</button>
        </div>
        <div className="flex justify-center w-screen">
          <MonthList date={date} setDate={setDate} />
          <YearList date={date} setDate={setDate} />
        </div>
      </div>

    </div>
  );
}

const MonthList = function (props) {
  const { date, setDate } = props;

  function handleOnChange(e) {
    setDate(_Date.setMonth(date, e.target.value));
  }

  return (
    <select value={_Date.getMonth(date)} onChange={handleOnChange}>
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>
  );
}

const YearList = function (props) {
  const { date, setDate } = props;

  function handleOnChange(e) {
    setDate(_Date.setYear(date, e.target.value));
  }

  const yearList = (function (date) {
    const tempDate = _Date.addYears(date, -3);
    const result = [_Date.getYear(tempDate)];
    for (let i = 1; i <= 6; i++) {
      result.push(_Date.getYear(_Date.addYears(tempDate, i)));
    }
    return (
      result.map(year => {
        return (<option key={year} value={year}>{year}</option>)
      })
    );
  })(date);

  return (
    <select value={_Date.getYear(date)} onChange={handleOnChange}>
      {yearList}
    </select>
  )
}

export default App;
