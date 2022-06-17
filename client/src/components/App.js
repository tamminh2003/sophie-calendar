import React from 'react';
import { useState } from 'react';
import * as _Date from 'date-fns';
import { useSwipeable } from 'react-swipeable';

import * as Comps from '.';
import { getStyle } from '../utils';

function App() {
  const [now, setNow] = useState(new Date());
  const [date, setDate] = useState(_Date.startOfMonth(now));
  const [mode, setMode] = useState(null);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setDate(_Date.addMonths(date, -1)),
    onSwipedRight: () => setDate(_Date.addMonths(date, 1))
  });

  const style = {
    background: "bg-gradient-to-b from-sky-400 to-indigo-500",
    size: "w-full h-screen"
  }

  return (
    <div id="App" className={getStyle(style)} {...swipeHandlers}>
      <Comps.Month date={date} setDate={setDate} mode={mode} />
      <Comps.ControlButtons date={date} setDate={setDate} mode={mode} setMode={setMode}/>
    </div>
  );
}

export default App;
