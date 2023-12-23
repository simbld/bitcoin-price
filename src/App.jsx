import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  useEffect(() => {
    fetch("https://blockchain.info/ticker")
      .then((response) => response.json())
      .then((data) => setBitcoinPrice(data.EUR.last))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);

  return (
    <div>
      <h1>Prix du Bitcoin</h1>
      {bitcoinPrice ? <p>{bitcoinPrice} EUR</p> : <p>Chargement...</p>}
    </div>
  );
}

export default App;
