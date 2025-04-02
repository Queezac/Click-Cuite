import useGameStore from "../stores/game-store";

// chiffres pas bon


const upgradeList = [
    {
      id: 1,
      name: "Verre XXL",
      image: "/shop/verrexxl.svg",
      description: "Produit automatiquement 0.1 cl/s",
      baseCost: 100,
      unlockAt: 1.5,  // Débloqué à 1,5 cl consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(0.1);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 2,
      name: "Client Régulier",
      image: "/shop/clientregulier.svg",
      description: "Produit automatiquement 1 cl/s",
      baseCost: 500,
      unlockAt: 20,  // Débloqué à 20 cl consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(1);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 3,
      name: "Groupe d'Amis",
      image: "/shop/groupeamis.svg",
      description: "Produit automatiquement 5 cl/s",
      baseCost: 2000,
      unlockAt: 5,  // Débloqué à 5 L consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(5);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 4,
      name: "Serveur Rapide",
      image: "/shop/serveurrapide.svg",
      description: "Produit automatiquement 20 cl/s",
      baseCost: 10000,
      unlockAt: 50,  // Débloqué à 50 L consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(20);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 5,
      name: "Tireuse Automatique",
      image: "/shop/tireuseautomatique.svg",
      description: "Produit automatiquement 1 L/s",
      baseCost: 50000,
      unlockAt: 500,  // Débloqué à 5 hL consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(100);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 6,
      name: "Machine à Cocktails",
      image: "/shop/machinecocktails.svg",
      description: "Produit automatiquement 5 L/s",
      baseCost: 250000,
      unlockAt: 5000,  // Débloqué à 5 kL consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(500);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 7,
      name: "Machine à Shots",
      image: "/shop/machineshots.svg",
      description: "Produit automatiquement 10 L/s",
      baseCost: 1000000,
      unlockAt: 50000,  // Débloqué à 50 kL consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(1000);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 8,
      name: "Tournoi de Fléchettes",
      image: "/shop/tournoiflechettes.svg",
      description: "Produit automatiquement 25 L/s",
      baseCost: 5000000,
      unlockAt: 100000,  // Débloqué à 1 ML consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(2500);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 9,
      name: "Machine à Sous PMU",
      image: "/shop/machinesous.svg",
      description: "Produit automatiquement 10 L/s",
      baseCost: 25000000,
      unlockAt: 1000000,  // Débloqué à 10 ML consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(10000);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 10,
      name: "Relais Apéro",
      image: "/shop/relaisapero.svg",
      description: "Produit automatiquement 20 L/s",
      baseCost: 100000000,
      unlockAt: 10000000,  // Débloqué à 1 GL consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(20000);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 11,
      name: "Distillerie Souterraine",
      image: "/shop/distilleriesouterraine.svg",
      description: "Produit automatiquement 100 L/s",
      baseCost: 500000000,
      unlockAt: 50000000,  // Débloqué à 5 GL consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(100000);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 12,
      name: "Le Big Boss du PMU",
      image: "/shop/bigbosspmu.svg",
      description: "Produit automatiquement 500 L/s",
      baseCost: 1000000000,
      unlockAt: 100000000,  // Débloqué à 1 TL consommés
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(500000);
      },
      upgradeCostMultiplier: 1.25,
    },
    {
      id: 13,
      name: "Le Dernier Rhum",
      image: "/shop/dernierrhum.svg",
      description: "Produit automatiquement 1 000 L/s",
      baseCost: 5000000000,
      unlockAt: 1000000000,  // Débloqué à 1 PL consommé
      effect: () => {
        const { addAlcoholPerSecond } = useGameStore.getState();
        addAlcoholPerSecond(1000000);
      },
      upgradeCostMultiplier: 1.25,
    }
];

export default upgradeList;
