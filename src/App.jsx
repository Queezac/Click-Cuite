import React, { useEffect } from "react";
import useCounterAnimated from "./hooks/useCounterAnimated";
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
    buyUpgrade,
    evoluateUpgrade,
    resetGame,
  } = useGameStore();

  const { activeEvent } = useEventStore();

  const displayedAlcoholCount = useCounterAnimated(alcoholCount, 100);

  const unlockedEvolutions = upgradeList
    .map((upgrade) => {
      const currentQuantity =
        useGameStore.getState().upgrades?.[upgrade.id]?.count ?? 0;

      const currentEvolutionIndex =
        useGameStore.getState().upgrades?.[upgrade.id]?.currentEvolution ?? -1;

      const availableEvolution = upgrade.evolution?.find(
        (evolution, index) =>
          evolution.unlockAt <= currentQuantity && index > currentEvolutionIndex
      );

      return availableEvolution
        ? {
            upgradeId: upgrade.id,
            evolution: availableEvolution,
          }
        : null;
    })
    .filter(Boolean);

  useEffect(() => {
    const interval = setInterval(() => {
      if (alcoholPerSecond > 0) {
        addAlcoholOnSecond(alcoholPerSecond / 10);
        const currentAlcoholCount = useGameStore.getState().alcoholCount;
        document.title = `${conversionUtils.mLToString(
          currentAlcoholCount
        )} - Click Cuite`;
      }
    }, 100);
    return () => clearInterval(interval);
  }, [alcoholPerSecond, addAlcoholOnSecond]);

  return (
    <div className="w-screen h-screen bg-[#14171F] text-white p-5 flex gap-x-8">
      {/* Gauche : Navbar + Zone principale */}
      <div className="w-2/3 flex flex-col gap-4">
        {/* Navbar */}
        <nav className="flex justify-between items-center w-full px-4 py-2 text-white">
          {/* Logo à gauche */}
          <div className="logo">
            <a href="#" className="account-btn">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="3" />
                <path d="M15 20H25M25 20L21 16M25 20L21 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Boutons au centre */}
          <div className="flex space-x-4">
            <button className="navButton"><strong>Statistiques</strong></button>
            <button className="navButton"><strong>Améliorations</strong></button>
            <button className="navButton"><strong>Classement</strong></button>
            <button className="navButton"><strong>Boutique</strong></button>
          </div>

          {/* Bouton Ascension à droite */}
          <button className="blackout">
            <strong onClick={resetGame}>Black Out</strong> 
          </button>
        </nav>


        {/* Zone principale (Clicker) */}
        <div className="flex-1 bg-[url('background_click.png')] bg-cover bg-center border-2 border-[#5F6EFF] rounded-md p-5 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold">
            {conversionUtils.mLToString(displayedAlcoholCount)}{" "}
          </p>
          <p className="text-lg font-semibold">
            Alcool par seconde : {conversionUtils.mLToString(alcoholPerSecond)}
          </p>
          <button
            onClick={() => addAlcoholOnClick(alcoholPerClick)}
            className="mt-3 transition-transform transform active:scale-98"
          >
            <img src="/alcool/huitsix.svg" alt="8.6 click" className="w-180" />
          </button>
        </div>
      </div>

      {/* Milieu : Améliorations + Shop */}
      <div className="w-1/4 flex flex-col gap-4">
        {/* Améliorations */}
        <div className="bg-gray-800 rounded-md p-4 flex flex-col">
          <div className="flex space-x-3">
            {unlockedEvolutions.map((evolution) => (
              <button
                onClick={() => evoluateUpgrade(evolution.upgradeId)}
                className="actionButton"
                key={evolution.upgradeId}
              >
                <img
                  key={evolution.id}
                  src={evolution.evolution.image}
                  alt="Action 1"
                  className="w-15 h-15"
                />
              </button>
            ))}{" "}
            {/* Améliorations */}
          </div>
        </div>

        {/* Shop */}
        <div className="bg-gray-800 rounded-md p-4 overflow-y-auto h-full">
          <ul className="list-none p-0">
            {upgradeList.map((upgrade) => {
              const currentQuantity =
                useGameStore.getState().upgrades[upgrade.id]?.count || 0;
              const cost = Math.floor(
                upgrade.baseCost *
                  Math.pow(upgrade.upgradeCostMultiplier, currentQuantity)
              );

              return (
                <button
                  key={upgrade.id}
                  onClick={() => buyUpgrade(upgrade.id)}
                  disabled={alcoholCount < cost}
                  className={`w-full px-3 py-2 mt-2 rounded-[10px] text-white flex justify-between items-center border-1 border-[#313b47]
                    ${
                      alcoholCount >= cost
                        ? "bg-[#14171F] border-[#14171F] cursor-pointer hover:border-1 hover:border-[#5F6EFF] hover:shadow-inner active:bg-[#0d141b]"
                        : "bg-[#313B47]"
                    }`}
                >
                  <div className="flex items-center gap-2 w-[60%]">
                    <img
                      src={upgrade.image}
                      alt={upgrade.name}
                      className={`w-10 h-10 flex-shrink-0 ${
                        alcoholCount < cost ? "opacity-50" : ""
                      }`}
                    />
                    <p
                      className={`text-[0.7vw] truncate ${
                        alcoholCount < cost ? "opacity-50" : ""
                      }`}
                    >
                      {upgrade.name}
                    </p>
                  </div>

                  <div className="flex items-center w-[38%]">
                    <strong
                      className={`text-[#5F6EFF] text-center w-[30%] ${
                        alcoholCount < cost ? "opacity-50" : ""
                      }`}
                    >
                      {currentQuantity}
                    </strong>
                    <strong
                      className={`text-[0.8vw] text-right w-[70%] ml-auto ${
                        alcoholCount < cost ? "opacity-50" : ""
                      }`}
                    >
                      {conversionUtils.mLToString(cost)}
                    </strong>
                  </div>
                </button>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Droite : Événements + Succès */}
      <div className="w-1/4 flex flex-col gap-4">
        <div>
          {/* Affichage dynamique de l'image de l'événement */}
          <img
            src={
              activeEvent ? activeEvent.image : "/evenement/pasdevenement.png"
            }
            alt=""
            className="w-full"
          />
          {/* Événements */}
          <div className="bg-gray-800 rounded-b-lg p-4">
            {activeEvent ? (
              <div>
                <p className="text-center">
                  Événement actif : {activeEvent.name}
                </p>
                <p className="text-center">{activeEvent.description}</p>
              </div>
            ) : (
              <p className="text-center italic">Attendez un événement</p>
            )}
          </div>
        </div>

        {/* Succès */}
        <div className="bg-[#313B47] rounded-t-lg rounded-b-lg h-full flex flex-col justify-start items-center">
          <div className="bg-gray-800 rounded-t-lg p-2 w-full">
            <h2 className="text-xl font-bold text-center mb-3">Succès</h2>
          </div>
          <div className="bg-[#14171F] rounded-full w-12 h-12 mx-4 my-4 shadow-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
