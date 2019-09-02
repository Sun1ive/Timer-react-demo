import React, { useState } from 'react';
import parseMs from 'parse-ms';
import { useTimer } from './Hooks/Timer';

const Timer = () => {
  const t = useTimer({ nextDate: 1567450344262, intervalTime: 1000 });

  return (
    <div>
      direction {t.direction} <br />
      MINUTES {parseMs(t.timeLeft).minutes} <br />
      SECONDS {parseMs(t.timeLeft).seconds}
    </div>
  );
};

const App: React.FC = () => {
  const [hide, setHide] = useState(false);

  const r = hide ? <Timer /> : null;

  return (
    <div className="App">
      <header style={{ width: 400, margin: '0 auto' }} className="App-header">
        {r}

        <button onClick={() => setHide(h => !h)}>Show hide</button>
      </header>
    </div>
  );
};

export default App;
