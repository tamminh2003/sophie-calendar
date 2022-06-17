import { useState } from 'react';
import * as _Date from 'date-fns';
import * as Comps from '.';
import { Button, Dialog } from '@mui/material';
import { getStyle } from '../utils';


const ControlButtons = function ({ date, setDate, mode, setMode }) {
  const [modeSelect, setModeSelect] = useState(false);
  function handleCloseModeSelect(e) { setModeSelect(false); }
  function handleOpenModeSelect(e) { setModeSelect(true); }
  function handlePrevClick(e) { setDate(_Date.addMonths(date, -1)); }
  function handleNextClick(e) { setDate(_Date.addMonths(date, 1)); }

  const buttonStyle = {
    other: "select-none cursor-default",
    font: "text-white font-semibold",
    size: "mx-4 px-4 h-7 scale-110",
    border: "border rounded-full",
    transform: "transform duration-75 active:bg-opacity-50"
  }

  return (
    <div className="absolute bottom-0 w-screen">

      <Comps.DatePicker date={date} setDate={setDate} />

      <div className="flex justify-between h-10 my-4">
        <div className="my-auto">
          <div className={`${getStyle(buttonStyle)} bg-sky-400 `} onClick={handlePrevClick}>Prev</div>
        </div>
        <div className="my-auto">
          <div className={`${getStyle(buttonStyle)} bg-sky-400 relative`}><span className="h-2 my-auto select-none" onClick={handleOpenModeSelect}>+</span></div>
        </div>
        <Dialog open={modeSelect} onClose={handleCloseModeSelect}>
          <Button onClick={() => { setMode('am'); handleCloseModeSelect(); }}>AM</Button>
          <Button onClick={() => { setMode('pm'); handleCloseModeSelect(); }}>PM</Button>
          <Button onClick={() => { setMode('night'); handleCloseModeSelect(); }}>Night</Button>
          <Button onClick={() => { setMode('delete'); handleCloseModeSelect(); }}>Delete</Button>
        </Dialog>
        <div className="my-auto">
          <div className={`${getStyle(buttonStyle)} bg-sky-400`} onClick={handleNextClick}>Next</div>
        </div>
      </div>
    </div>
  );
}

export default ControlButtons