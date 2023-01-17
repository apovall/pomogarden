import PhaserWrapper from "./components/PhaserWrapper";
import { useEffect, useState } from "react";

function App() {
  const [map, setMap] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      let res = await fetch('/mapGenerator', {signal})
      // let res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {signal})
      res = await res.json()
      setMap(res);
      console.log(res);
      console.log('firing');       
    })()

    return () => controller.abort
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pomodoro Garden</h1>
        <div>
          <PhaserWrapper/>
        </div>
      </header>
    </div>
  );
}

export default App;
