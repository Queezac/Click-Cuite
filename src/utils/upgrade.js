import useGameStore from "../stores/game-store";

const upgradeList = [
  {
    id: 1,
    name: "Upgrade 1",
    description: "Ajoute 10 mL par clic",
    baseCost: 100,
    unlockAt: 10,
    effect: () => {
      const { addAlcoholPerClick } = useGameStore.getState();
      addAlcoholPerClick(10);
    },
    upgradeCostMultiplier: 1.25,
  },
  {
    id: 2,
    name: "Upgrade 2",
    description: "Ajoute 10 mL par seconde",
    baseCost: 200,
    unlockAt: 50,
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(10);
    },
    upgradeCostMultiplier: 1.25,
  },
];

export default upgradeList;
