import { useState, useEffect, useRef } from "react";
import "./App.css";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [delay, setDelay] = useState(1000);

  useInterval(() => {
    fetch("https://blockchain.info/ticker")
      .then((response) => response.json())
      .then((data) => {
        console.log("Nouveau prix:", data.EUR.last);
        setBitcoinPrice(data.EUR.last);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, delay);

  return (
    <div>
      <h1>Prix du Bitcoin</h1>
      {bitcoinPrice ? <p>{bitcoinPrice} EUR</p> : <p>Chargement...</p>}

      <div>
        <label>
          Fréquence de mise à jour : {delay} ms
          <input
            type="range"
            min="100"
            max="10000"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
