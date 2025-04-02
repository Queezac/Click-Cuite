import { create } from "zustand";
import { persist } from "zustand/middleware";
import upgradeList from "../utils/upgrade";

const useGameStore = create(
  persist((set, get) => ({
    alcoholCount: 0, // Initial value are in mL
    alcoholPerClick: 1,
    alcoholPerSecond: 0,
    upgrades: {}, // List of upgrades {id: count}

    clickMultiplier: 1,
    secondMultiplier: 1,

    addAlcoholOnClick: (amount = 1) => {
      const { clickMultiplier } = get();
      set((state) => ({
        alcoholCount: state.alcoholCount + amount * clickMultiplier,
      }));
    },

    addAlcoholOnSecond: (amount = 1) => {
      const { secondMultiplier } = get();
      set((state) => ({
        alcoholCount: state.alcoholCount + amount * secondMultiplier,
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

    addAlcoholPerClick: (amount) => {
      set((state) => ({
        alcoholPerClick: state.alcoholPerClick + amount,
      }));
    },

    addAlcoholPerSecond: (amount) => {
      set((state) => ({
        alcoholPerSecond: state.alcoholPerSecond + amount,
      }));
    },

    setClickMultiplier: (multiplier) => {
      set(() => ({
        clickMultiplier: multiplier,
      }));
    },
    setSecondMultiplier: (multiplier) => {
      set(() => ({
        secondMultiplier: multiplier,
      }));
    },
  })),
  {
    name: "clickandcuit:gameState",
    getStorage: () => localStorage,
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(
          ([key]) => !["clickMultiplier", "secondMultiplier"].includes(key)
        )
      ),
  }
);

export default useGameStore;
