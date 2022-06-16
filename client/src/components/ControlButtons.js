import * as _Date from 'date-fns';
import * as Comps from '.';


const ControlButtons = function ({ date, setDate }) {
  function handlePrevClick(e) { setDate(_Date.addMonths(date, -1)); }
  function handleNextClick(e) { setDate(_Date.addMonths(date, 1)); }

  const className = "select-none text-white mx-4 px-4 rounded-full border font-semibold transform duration-75 active:bg-opacity-50 scale-110 cursor-default";

  return (
    <div className="absolute bottom-0 w-screen">
      <Comps.DatePicker date={date} setDate={setDate} />
      <div className="flex justify-center my-4">
        <div className={`${className} bg-teal-500`}>AM</div>
        <div className={`${className} bg-purple-500`}>PM</div>
        <div className={`${className} bg-indigo-600`}>Night</div>
      </div>
      <div className="flex justify-center my-4">
        <div className={`${className} bg-sky-400`} onClick={handlePrevClick}>Prev</div>
        <div className={`${className} bg-sky-400`} onClick={handleNextClick}>Next</div>
      </div>

    </div>
  )
}

export default ControlButtons