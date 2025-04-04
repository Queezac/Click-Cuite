import useGameStore from "../stores/game-store";

// chiffres pas bon

const upgradeList = [
  {
    id: 1,
    name: "Verre XXL",
    image: "/shop/verrexxl.svg",
    description: "Produit automatiquement 0.1 cl/s",
    baseCost: 15,
    unlockAt: 1.5, // Débloqué à 1,5 cl consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(0.1);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Pinte renforcée",
        image: "/amélioration/verrexxl1.png",
        description: "Augmente la production de clics de x2 et la production de verre XXL de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Fontaine de bière",
        image: "/amélioration/verrexxl2.png",
        description: "Augmente la production de clics de x2 et la production de verre XXL de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 10,
      },
      {
        name: "Tonneau Express",
        image: "/amélioration/verrexxl3.png",
        description: "Chaque construction (hors Verre XXL) génère +0.1 cl/clic supplémentaire.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
  {
    id: 2,
    name: "Client Régulier",
    image: "/shop/clientregulier.svg",
    description: "Produit automatiquement 1 cl/s",
    baseCost: 100,
    unlockAt: 20, // Débloqué à 20 cl consommés
    effect: () => {
      const { addAlcoholPerClick } = useGameStore.getState();
      addAlcoholPerClick(1);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Pilier de comptoir",
        image: "/amélioration/clientregulier1.png",
        description: "Augmente la production de chaque client régulier de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Tavernier Fantôme",
        image: "/amélioration/clientregulier2.png",
        description: "Augmente la production de chaque client régulier de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
  {
    id: 3,
    name: "Groupe d'Amis",
    image: "/shop/groupeamis.svg",
    description: "Produit automatiquement 5 cl/s",
    baseCost: 1100,
    unlockAt: 5, // Débloqué à 5 L consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(5);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Happy Hour Éternel",
        image: "/amélioration/groupeamis1.png",
        description: "Augmente la production de chaque groupe d'amis de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Enterrement de vie de garçon",
        image: "/amélioration/groupeamis2.png",
        description: "Augmente la production de chaque groupe d'amis de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
  {
    id: 4,
    name: "Serveur Rapide",
    image: "/shop/serveurrapide.svg",
    description: "Produit automatiquement 20 cl/s",
    baseCost: 12000,
    unlockAt: 50, // Débloqué à 50 L consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(20);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Robot serveur",
        image: "/amélioration/serveurrapide1.png",
        description: "Augmente la production de chaque serveur rapide de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Bar en libre-service",
        image: "/amélioration/serveurrapide2.png",
        description: "Augmente la production de chaque serveur rapide de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
  {
    id: 5,
    name: "Tireuse Automatique",
    image: "/shop/tireuseautomatique.svg",
    description: "Produit automatiquement 1 L/s",
    baseCost: 130000,
    unlockAt: 500, // Débloqué à 5 hL consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(100);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Machine infernale",
        image: "/amélioration/tireuseautomatique1.png",
        description: "Augmente la production de chaque tireuse automatique de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Réserve infinie",
        image: "/amélioration/tireuseautomatique2.png",
        description: "Augmente la production de chaque tireuse automatique de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
  {
    id: 6,
    name: "Machine à Cocktails",
    image: "/shop/machinecocktails.svg",
    description: "Produit automatiquement 5 L/s",
    baseCost: 1400000,
    unlockAt: 5000, // Débloqué à 5 kL consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(500);
    },
    upgradeCostMultiplier: 1.2,
  },
  {
    id: 7,
    name: "Machine à Shots",
    image: "/shop/machineshots.svg",
    description: "Produit automatiquement 10 L/s",
    baseCost: 20000000,
    unlockAt: 50000, // Débloqué à 50 kL consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(1000);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Tournée Express",
        image: "/amélioration/machineshots1.png",
        description: "Augmente la production de chaque machine à shots de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Concours du plus gros buveur",
        image: "/amélioration/machineshots2.png",
        description: "Augmente la production de chaque machine à shots de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
  {
    id: 8,
    name: "Tournoi de Fléchettes",
    image: "/shop/tournoiflechettes.svg",
    description: "Produit automatiquement 25 L/s",
    baseCost: 330000000,
    unlockAt: 100000, // Débloqué à 1 ML consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(2500);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Compétition locale",
        image: "/amélioration/tournoiflechettes1.png",
        description: "Augmente la production de chaque tournoi de fléchettes de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Championnat des bars",
        image: "/amélioration/tournoiflechettes2.png",
        description: "Augmente la production de chaque tournoi de fléchettes de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
  {
    id: 9,
    name: "Machine à Sous PMU",
    image: "/shop/machinesous.svg",
    description: "Produit automatiquement 10 L/s",
    baseCost: 5100000000,
    unlockAt: 1000000, // Débloqué à 10 ML consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(10000);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Jetons gratuits",
        image: "/amélioration/machinesous1.png",
        description: "Augmente la production de chaque machine à sous de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Truquée par le patron",
        image: "/amélioration/machinesous2.png",
        description: "Augmente la production de chaque machine à sous de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
  {
    id: 10,
    name: "Relais Apéro",
    image: "/shop/relaisapero.svg",
    description: "Produit automatiquement 20 L/s",
    baseCost: 75000000000,
    unlockAt: 10000000, // Débloqué à 1 GL consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(20000);
    },
    upgradeCostMultiplier: 1.2,
  },
  {
    id: 11,
    name: "Distillerie Souterraine",
    image: "/shop/distilleriesouterraine.svg",
    description: "Produit automatiquement 100 L/s",
    baseCost: 1000000000000,
    unlockAt: 50000000, // Débloqué à 5 GL consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(100000);
    },
    upgradeCostMultiplier: 1.2,
  },
  {
    id: 12,
    name: "Le Big Boss du PMU",
    image: "/shop/bigbosspmu.svg",
    description: "Produit automatiquement 500 L/s",
    baseCost: 14000000000000,
    unlockAt: 100000000, // Débloqué à 1 TL consommés
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(500000);
    },
    upgradeCostMultiplier: 1.2,
  },
  {
    id: 13,
    name: "Le Dernier Rhum",
    image: "/shop/dernierrhum.svg",
    description: "Produit automatiquement 1 000 L/s",
    baseCost: 170000000000000,
    unlockAt: 1000000000, // Débloqué à 1 PL consommé
    effect: () => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(1000000);
    },
    onEvolution: (quantity, oldEvolution, newEvolution) => {
      const { addAlcoholPerSecond } = useGameStore.getState();
      addAlcoholPerSecond(
        0.1 *
          quantity *
          (newEvolution.multiplier - (oldEvolution?.multiplier ?? 1))
      );
    },
    upgradeCostMultiplier: 1.2,
    evolution: [
      {
        name: "Boisson des Dieux",
        image: "/amélioration/dernierrhum1.png",
        description: "Augmente la production de chaque Dernier Rhum de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 1,
      },
      {
        name: "Mythe alcoolique",
        image: "/amélioration/dernierrhum2.png",
        description: "Augmente la production de chaque Dernier Rhum de x2.",
        multiplier: 2,
        cost: 200,
        unlockAt: 50,
      },
    ],
  },
];

export default upgradeList;
