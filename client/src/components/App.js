import React from 'react';
import { useState } from 'react';
import * as _Date from 'date-fns';

import * as Comps from '.';
import { getStyle } from '../utils';

function App() {
  const [now, setNow] = useState(new Date());
  const [date, setDate] = useState(_Date.startOfMonth(now));
  const [mode, setMode] = useState(null);

  const style = {
    background: "bg-gradient-to-b from-sky-400 to-indigo-500",
    size: "w-screen h-screen"
  }

  return (
    <div id="App" className={getStyle(style)}>
      <Comps.MenuBar />
      <Comps.Month date={date} setDate={setDate} />
      
      <Comps.ControlButtons date={date} setDate={setDate} />
    </div>
  );
}

export default App;
