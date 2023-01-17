import PhaserWrapper from "./components/PhaserWrapper";
import { useEffect, useState } from "react";

function App() {
  const [gameMapLayout, setGameMapLayout] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      let res = await fetch("/mapGenerator", { signal });
      res = await res.json();
      setGameMapLayout(res);
      console.log(res);
      console.log("firing");
      setIsLoading(false)
    })();

    return () => controller.abort;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pomodoro Garden</h1>
        <div>{isLoading ? <p>is Loading </p> : <PhaserWrapper gameMapLayout={gameMapLayout} />}</div>
      </header>
    </div>
  );
}

export default App;
