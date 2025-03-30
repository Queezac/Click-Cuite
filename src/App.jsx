import React, { useEffect } from "react";
import useGameStore from "./stores/game-store";
import conversionUtils from "./utils/conversion";
import { useEventStore } from "./utils/events";
import upgradeList from "./utils/upgrade";

function App() {
  const {
    alcoholCount,
    alcoholPerClick,
    alcoholPerSecond,
    addAlcoholOnSecond,
    addAlcoholOnClick,
    addAlcohol,
    buyUpgrade,
  } = useGameStore();

  const { activeEvent, triggerRandomEvent } = useEventStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (alcoholPerSecond > 0) {
        addAlcoholOnSecond(alcoholPerSecond);
        const currentAlcoholCount = useGameStore.getState().alcoholCount;
        document.title = `Click Cuite - ${conversionUtils.mLToString(
          currentAlcoholCount
        )}`;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [alcoholPerSecond, addAlcohol, addAlcoholOnSecond]);

  useEffect(() => {
    const interval = setInterval(() => {
      const chance = Math.random();
      if (chance < 1) {
        triggerRandomEvent();
      }

      clearInterval(interval); // Nettoie l'intervalle après le nombre maximum d'exécutions
      console.log("Interval nettoyé après");
    }, 1000);

    return () => clearInterval(interval);
  }, [triggerRandomEvent]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Click Cuite</h1>
      <p>
        <strong>Alcool collecté :</strong>{" "}
        {conversionUtils.mLToString(alcoholCount)}
      </p>
      <p>
        <strong>Alcool par clic :</strong>{" "}
        {conversionUtils.mLToString(alcoholPerClick)}
      </p>
      <p>
        <strong>Alcool par seconde :</strong>{" "}
        {conversionUtils.mLToString(alcoholPerSecond)}
      </p>

      <button
        onClick={() => addAlcoholOnClick(alcoholPerClick)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        Boire un verre
      </button>

      {activeEvent ? (
        <div style={{ padding: "10px" }}>
          <h2>Événement actif : {activeEvent.name}</h2>
          <p>{activeEvent.description}</p>
        </div>
      ) : (
        <p>Aucun événement actif</p>
      )}

      <h2>Améliorations</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {upgradeList.map((upgrade) => {
          const currentQuantity =
            useGameStore.getState().upgrades[upgrade.id] || 0;
          const cost = Math.floor(
            upgrade.baseCost *
              Math.pow(upgrade.upgradeCostMultiplier, currentQuantity)
          );

          return (
            <li
              key={upgrade.id}
              style={{
                marginBottom: "15px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <strong>{upgrade.name}</strong>
              <p>{upgrade.description}</p>
              <p>x{currentQuantity}</p>
              <p>
                <em>Coût :</em> {conversionUtils.mLToString(cost)}
              </p>
              <button
                onClick={() => buyUpgrade(upgrade.id)}
                disabled={alcoholCount < cost}
                style={{
                  padding: "5px 10px",
                  cursor: alcoholCount >= cost ? "pointer" : "not-allowed",
                  backgroundColor: alcoholCount >= cost ? "#4CAF50" : "#ccc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                }}
              >
                Acheter
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
