import { create } from "zustand";
import { persist } from "zustand/middleware";
import upgradeList from "../utils/upgrade";
import { useEventStore } from "./event-store";

const INITIAL_VALUE = 0;
const useGameStore = create(
  persist((set, get) => ({
    alcoholCount: INITIAL_VALUE, // Initial value are in mL
    alcoholPerClick: 1,
    alcoholPerSecond: 0,
    upgrades: {
      // Example: { id: 1, count: 0, currentEvolution: 0 }
    }, // List of upgrades {id: {count: number, multiplier: number}}

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
    evoluateUpgrade: (upgradeId) => {
      const { alcoholCount, upgrades } = get();
      const upgrade = upgradeList.find((u) => u.id === upgradeId);
      if (!upgrade) return console.warn("Upgrade not found");
      const currentQuantity = upgrades[upgradeId]?.count || 0;

      const currentEvolution = upgrades[upgradeId]?.currentEvolution ?? -1;
      const nextEvolution = upgrade.evolution[currentEvolution + 1];

      if (!nextEvolution) return console.warn("No next evolution");

      const cost = Math.floor(
        nextEvolution.cost *
          Math.pow(upgrade.upgradeCostMultiplier, currentQuantity)
      );

      if (alcoholCount >= cost) {
        set((state) => {
          upgrade.onEvolution(
            currentQuantity,
            upgrade.evolution[currentEvolution],
            nextEvolution
          );
          return {
            alcoholCount: state.alcoholCount - cost,
            upgrades: {
              ...state.upgrades,
              [upgradeId]: {
                count: currentQuantity,
                currentEvolution: currentEvolution + 1,
              },
            },
          };
        });
      }
    },
    buyUpgrade: (upgradeId) => {
      const { alcoholCount, upgrades } = get();
      const upgrade = upgradeList.find((u) => u.id === upgradeId);
      if (!upgrade) return console.warn("Upgrade not found");

      const currentQuantity = upgrades[upgradeId]?.count || 0;
      const currentEvolution = upgrades[upgradeId]?.currentEvolution ?? -1;
      const currentMultiplier =
        upgrade.evolution?.[currentEvolution]?.multiplier || 1;

      const cost = Math.floor(
        upgrade.baseCost *
          Math.pow(upgrade.upgradeCostMultiplier, currentQuantity)
      );

      if (alcoholCount >= cost) {
        set((state) => {
          upgrade.effect(currentMultiplier);
          return {
            alcoholCount: state.alcoholCount - cost,
            upgrades: {
              ...state.upgrades,
              [upgradeId]: {
                count: currentQuantity + 1,
                currentEvolution: currentEvolution,
              },
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
    resetGame: () => {
      useEventStore.getState().clearEvent();
      set(() => ({
        alcoholCount: INITIAL_VALUE,
        alcoholPerClick: 1,
        alcoholPerSecond: 0,
        upgrades: {},
        clickMultiplier: 1,
        secondMultiplier: 1,
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
