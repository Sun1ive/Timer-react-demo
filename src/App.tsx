import React, { useState } from 'react';
import parseMs from 'parse-ms';
import { useCountdown } from './Hooks/Timer';

const Timer = () => {
  const t = useCountdown({ nextDate: 1567366340625, intervalTime: 1000 });

  return <div>{t}</div>;
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
