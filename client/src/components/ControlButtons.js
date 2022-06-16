import * as _Date from 'date-fns';


const ControlButtons = function ({ date, setDate }) {
  function handlePrevClick(e) { setDate(_Date.addMonths(date, -1)); }
  function handleNextClick(e) { setDate(_Date.addMonths(date, 1)); }

  const className = "select-none text-white mx-4 px-4 rounded-full border font-semibold transform duration-75 active:bg-opacity-50 scale-110 cursor-default";

  return (
    <div className="absolute bottom-0 w-screen">
      <div className="flex justify-center mb-4">
        <div className={`${className} bg-teal-500`}>AM</div>
        <div className={`${className} bg-purple-500`}>PM</div>
        <div className={`${className} bg-indigo-600`}>Night</div>
      </div>
      <div className="flex justify-center mb-4">
        <div className={`${className} bg-sky-400`} onClick={handlePrevClick}>Prev</div>
        <div className={`${className} bg-sky-400`} onClick={handleNextClick}>Next</div>
      </div>
      <div className="flex justify-center w-screen">
        <MonthList date={date} setDate={setDate} />
        <YearList date={date} setDate={setDate} />
      </div>
    </div>
  )
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

export default ControlButtons