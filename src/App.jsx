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

  useInterval(() => {
    fetch("https://blockchain.info/ticker")
      .then((response) => response.json())
      .then((data) => setBitcoinPrice(data.EUR.last))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, [1000]);
  console.log("Prix actualisé");
  return (
    <div>
      <h1>Prix du Bitcoin</h1>
      {bitcoinPrice ? <p>{bitcoinPrice} EUR</p> : <p>Chargement...</p>}
    </div>
  );
}

export default App;
