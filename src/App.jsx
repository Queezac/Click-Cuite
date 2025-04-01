import React, { useEffect } from "react";
import { useEventStore } from "./stores/event-store";
import useGameStore from "./stores/game-store";
import conversionUtils from "./utils/conversion";
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
        document.title = `${conversionUtils.mLToString(
          currentAlcoholCount
        )} - Click Cuite`;
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

      clearInterval(interval);
      console.log("Interval nettoyé après");
    }, 1000);

    return () => clearInterval(interval);
  }, [triggerRandomEvent]);

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-5 flex">
      {/* Colonne droite (navbar + zone principale) */}
      <div className="w-2/3 flex flex-col gap-4 p-4">
        {/* Navbar */}
        <nav className="flex justify-center space-x-4 w-full">
          <button className="navButton">
            <strong>Statistiques</strong>
          </button>
          <button className="navButton">
            <strong>Améliorations</strong>
          </button>
          <button className="navButton">
            <strong>Classement</strong>
          </button>
        </nav>

        {/* Zone principale */}
        <div className="flex-1 bg-[url('background_click.png')] bg-cover bg-center border-2 rounded-md p-5 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold">
            {conversionUtils.mLToString(alcoholCount)} <strong>consommé</strong>
          </p>
          <p className="text-lg font-semibold">
            Alcool par seconde : {conversionUtils.mLToString(alcoholPerSecond)}
          </p>
          <button
            id="addAlcool"
            onClick={() => addAlcoholOnClick(alcoholPerClick)}
            className="mt-3 transition-transform transform active:scale-98"
          >
            <img src="/alcool/huitsix.svg" alt="8.6 click" className="w-180" />
          </button>
        </div>
      </div>
      {/* Colonne gauche (événements, améliorations, shop) */}
      <div className="w-1/3 flex flex-col gap-4 p-4">
        {/* Événements (collé en haut) */}
        <div className="bg-gray-800 rounded-md p-4">
          {activeEvent ? (
            <div className="p-2">
              <p className="text-center">Événement actif : {activeEvent.name}</p>
              <p className="text-center">{activeEvent.description}</p>
            </div>
          ) : (
            <p className="text-center italic">Attendez un événement</p>
          )}
        </div>

        {/* Améliorations */}
        <div className="bg-gray-800 rounded-md p-4 flex flex-col">
          <div className="flex justify-left space-x-3">
            <button className="actionButton">
              <img src="shop\ALCOOLFORT.svg" alt="Action 1" className="w-15 h-15" />
            </button>
            <button className="actionButton">
              <img src="shop\ALCOOLFORT.svg" alt="Action 2" className="w-15 h-15" />
            </button>
          </div>
        </div>

        {/* Shop */}
        <div className="bg-gray-800 rounded-md p-4 overflow-y-auto h-full">
          <ul className="list-none p-0">
            {upgradeList.map((upgrade) => {
              const currentQuantity = useGameStore.getState().upgrades[upgrade.id] || 0;
              const cost = Math.floor(
                upgrade.baseCost * Math.pow(upgrade.upgradeCostMultiplier, currentQuantity)
              );
              return (
                <button
                  key={upgrade.id}
                  onClick={() => buyUpgrade(upgrade.id)}
                  disabled={alcoholCount < cost}
                  className={`w-full px-3 py-2 mt-2 rounded-[10px] text-white flex justify-between items-center ${
                    alcoholCount >= cost ? "bg-[#14191F] cursor-pointer" : "bg-[#313B47] cursor-not-allowed"
                  }`}
                >
                  <img src="\shop\verrexxl.svg" alt="" className="w-10 h-10" />
                  <p>{upgrade.name}</p>
                  <strong className="text-[#5F6EFF]">{currentQuantity}</strong>
                  <p>{conversionUtils.mLToString(cost)}</p>
                </button>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
