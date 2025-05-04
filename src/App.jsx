import React from "react";
import { Clicker } from "./components/clicker";
import { Event } from "./components/event";
import UpgradeModal from "./components/modal/upgradeModal";
import { Navbar } from "./components/navbar";
import { Shop } from "./components/shop";
import { Upgrade } from "./components/upgrade";
function App() {
  return (
    <div className="w-screen h-screen bg-[#14171F] text-white p-5 flex gap-x-8">
      <UpgradeModal isOpen={false}></UpgradeModal>

      {/* Gauche : Navbar + Zone principale */}
      <div className="w-2/3 flex flex-col gap-4">
        {/* Navbar */}
        <Navbar />

        {/* Zone principale (Clicker) */}
        <Clicker />
      </div>

      {/* Milieu : Améliorations + Shop */}
      <div className="w-1/4 flex flex-col gap-4">
        {/* Améliorations */}
        <Upgrade />

        {/* Shop */}
        <Shop />
      </div>

      {/* Droite : Événements + Succès */}
      <div className="w-1/4 flex flex-col gap-4">
        <Event />

        {/* Succès */}
        <div className="bg-[#313B47] rounded-t-lg rounded-b-lg h-full flex flex-col justify-start items-center">
          <div className="bg-gray-800 rounded-t-lg p-2 w-full">
            <h2 className="text-[1vw] font-bold text-center">Succès</h2>
          </div>
          <p className="p-5">Arrive bientôt...</p>
        </div>
      </div>
    </div>
  );
}

export default App;
