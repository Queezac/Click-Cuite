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

  // la nav barre me fait scroll /!\ revoir l'agencement des div
  return (
    <div className="h-screen w-full bg-gray-900 text-white p-5">
      {/* Navbar */}
      <nav className="flex justify-start space-x-4 mb-5">
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

      {/* Layout principal avec GRID */}
      <div className="grid grid-cols-4 grid-rows-[3fr_1fr_2fr] gap-4 h-full">
        {/* 🟠 Zone principale (grosse zone à gauche) */}
        <div className="col-span-3 row-span-3 bg-gray-800 rounded-md p-5 flex flex-col items-center justify-center">
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

        {/* Événements (carré en haut à droite) */}
        <div className="col-span-1 bg-gray-800 rounded-md p-4">
          {activeEvent ? (
            <div style={{ padding: "10px" }}>
              <p className="text-center">
                Événement actif : {activeEvent.name}
              </p>
              <p className="text-center">{activeEvent.description}</p>
            </div>
          ) : (
            <p className="text-center">Attendez un événement</p>
          )}
        </div>

        {/* Améliorations (carré milieu droite) */}
        <div className="col-span-1 bg-gray-800 rounded-md p-4">
          <h2 className="text-xl font-bold text-center mb-3">Améliorations</h2>
          <div className="flex justify-center space-x-3">
            <button className="actionButton">
              <img src="/icons/icon1.png" alt="Action 1" className="w-30" />
            </button>
            <button className="actionButton">
              <img src="/icons/icon2.png" alt="Action 2" className="w-30" />
            </button>
            <button className="actionButton">
              <img src="/icons/icon3.png" alt="Action 3" className="w-30" />
            </button>
          </div>
        </div>

        {/* Shop (carré en bas droite) */}
        <div className="col-span-1 bg-gray-800 rounded-md p-4 overflow-y-auto h-full">
          <ul className="list-none p-0">
            {upgradeList.map((upgrade) => {
              const currentQuantity =
                useGameStore.getState().upgrades[upgrade.id] || 0;
              const cost = Math.floor(
                upgrade.baseCost *
                  Math.pow(upgrade.upgradeCostMultiplier, currentQuantity)
              );

              return (
                <button
                  key={upgrade.id}
                  onClick={() => buyUpgrade(upgrade.id)}
                  disabled={alcoholCount < cost}
                  className={`w-full px-3 py-2 mt-2 rounded-[10px] text-white flex justify-between items-center ${
                    alcoholCount >= cost
                      ? "bg-[#14191F] cursor-pointer"
                      : "bg-[#313B47] cursor-not-allowed"
                  }`}
                >
                  {/* /!\ mettre image diff pour chaque ligne /!\ */}
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
