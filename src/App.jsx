import React, { useState, useEffect } from "react";

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [lastPrice, setLastPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = () => {
      fetch("https://blockchain.info/ticker")
        .then((response) => response.json())
        .then((data) => {
          const newPrice = data.EUR.last;
          if (newPrice !== lastPrice) {
            setBitcoinPrice(newPrice);
            setLastPrice(newPrice);
            console.log("nouveaux prix", newPrice);
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération des données:", error)
        );
    };

    fetchPrice();
    const intervalId = setInterval(fetchPrice, 30000);
    return () => clearInterval(intervalId);
  }, [lastPrice]);

  return (
    <div>
      <h1>Prix du Bitcoin</h1>
      {bitcoinPrice !== null ? (
        <p>Prix actuel : {bitcoinPrice} EUR</p>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default App;
