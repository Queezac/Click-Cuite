import { create } from "zustand";
import { persist } from "zustand/middleware";
import upgradeList from "../utils/upgrade";

const useGameStore = create(
  persist((set, get) => ({
    alcoholCount: 0, // Initial value are in mL
    alcoholPerClick: 1,
    alcoholPerSecond: 0,
    upgrades: {}, // List of upgrades {id: count}

    addAlcohol: (amount = 1) => {
      set((state) => ({
        alcoholCount: state.alcoholCount + amount,
      }));
    },

    buyUpgrade: (upgradeId) => {
      const { alcoholCount, upgrades } = get();
      const upgrade = upgradeList.find((u) => u.id === upgradeId);
      if (!upgrade) return console.warn("Upgrade not found");

      const currentQuantity = upgrades[upgradeId] || 0;
      const cost = Math.floor(
        upgrade.baseCost *
          Math.pow(upgrade.upgradeCostMultiplier, currentQuantity)
      );

      if (alcoholCount >= cost) {
        set((state) => {
          upgrade.effect(state);
          return {
            alcoholCount: state.alcoholCount - cost,
            upgrades: {
              ...state.upgrades,
              [upgradeId]: currentQuantity + 1,
            },
          };
        });
      } else {
        console.warn("Pas assez d'alcool pour acheter cette amélioration.");
      }
    },
    setAlcoholPerClick: (amount) => {
      set(() => ({
        alcoholPerClick: amount,
      }));
    },
    setAlcoholPerSecond: (amount) => {
      set(() => ({
        alcoholPerSecond: amount,
      }));
    },
  })),
  {
    name: "clickandcuit:gameState",
    getStorage: () => localStorage,
  }
);

export default useGameStore;
