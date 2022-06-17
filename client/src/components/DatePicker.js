import { useState } from 'react';
import { Dialog } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
import { YearPicker } from "@mui/x-date-pickers/YearPicker";
import * as _Date from 'date-fns';

/**
 * Modal for date picker
 */
export default function DatePicker({ date, setDate }) {

  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false)

  function handleCloseMonth() { setOpenMonth(false); }
  function handleOpenMonth() { setOpenMonth(true); }
  function handleCloseYear() { setOpenYear(false); }
  function handleOpenYear() { setOpenYear(true); }

  const minDate = new Date('2020-01-01T00:00:00.000');
  const maxDate = new Date('2034-01-01T00:00:00.000');

  return (
    <>
      <div className="text-center text-3xl font-bold text-slate-100" >
        <span className="select-none" onClick={handleOpenMonth}>{_Date.format(date, 'LLLL')}</span> <span className="select-none" onClick={handleOpenYear}>{_Date.format(date, 'yyyy')}</span>
      </div>
      <Dialog open={openMonth} onClose={handleCloseMonth}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MonthPicker
            date={date}
            onChange={newDate => { setDate(newDate); handleCloseMonth(); }}
            minDate={minDate}
            maxDate={maxDate}
            className={"w-monthPicker"}
          />
        </LocalizationProvider>
      </Dialog>

      <Dialog open={openYear} onClose={handleCloseYear}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <YearPicker
            date={date}
            onChange={newDate => { setDate(newDate); handleCloseYear(); }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </Dialog>

    </>
  );
}