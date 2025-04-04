import { create } from "zustand";
import useGameStore from "./game-store";

const eventsList = [
  {
    id: 1,
    image: "/evenement/happyhour.png",
    name: "Happy Hour",
    description: "Hé patron, remets-moi ça, je tiens encore debout !", //Les prix sont réduits, mais la consommation augmente !
    unlockAt: 1,
    onStart: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();
      setClickMultiplier(2);
      setSecondMultiplier(2);
    },
    onEnd: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();
      setClickMultiplier(1);
      setSecondMultiplier(1);
    },
    duration: 5 * 60 * 1000,
  },
  {
    id: 2,
    image: "/evenement/verresdoubles.png",
    name: "Verres Doublés",
    description: "Ça marche, mais si tu tombes, c’est pas moi qui te ramasse !", //Double les cliques !
    unlockAt: 1,
    onStart: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(0.5);
      setSecondMultiplier(0.5);
    },
    onEnd: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();
      setClickMultiplier(1);
      setSecondMultiplier(1);
    },
    duration: 2 * 60 * 1000,
  },
  {
    id: 3,
    image: "/evenement/alcoolfort.png",
    name: "Alcool Fort",
    description: "Hips… C’est moi ou le sol bouge tout seul ?", //La boisson est plus corsée, +2% de L consommé en +
    unlockAt: 1,
    onStart: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(0.5);
      setSecondMultiplier(0.5);
    },
    onEnd: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(1);
      setSecondMultiplier(1);
    },
    duration: 5 * 60 * 1000,
  },
  {
    id: 4,
    image: "/evenement/serviceexpress.png",
    name: "Service Express",
    description:
      "Allez, on garde le rythme ! Plus ils boivent, plus les pourboires tombent !", //Les serveurs apportent les verres plus rapidement, boostant la consommation automatique !
    unlockAt: 1,
    onStart: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(0.5);
      setSecondMultiplier(0.5);
    },
    onEnd: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(1);
      setSecondMultiplier(1);
    },
    duration: 5 * 60 * 1000,
  },
  {
    id: 5,
    image: "/evenement/panneseche.png",
    name: "Panne sèche",
    description: "Tous les gains sont divisés par 2 pendant 5 minutes.", //Tous les gains sont divisés par 2 pendant 5 minutes.
    unlockAt: 1,
    onStart: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(0.5);
      setSecondMultiplier(0.5);
    },
    onEnd: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(1);
      setSecondMultiplier(1);
    },
    duration: 5 * 60 * 1000,
  },
  {
    id: 6,
    image: "/evenement/pasdevenement.png",
    name: "pasevenement",
    description: "Attendez un événement",
    unlockAt: 1,
    onStart: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(0.5);
      setSecondMultiplier(0.5);
    },
    onEnd: () => {
      const { setClickMultiplier, setSecondMultiplier } =
        useGameStore.getState();

      setClickMultiplier(1);
      setSecondMultiplier(1);
    },
    duration: 5 * 60 * 1000,
  },
];

export default eventsList;

const useEventStore = create((set) => ({
  activeEvent: null,

  triggerRandomEvent: () => {
    if (useGameStore.getState().activeEvent) return;
    const possibleEvents = eventsList.filter(
      (event) => event.unlockAt <= useGameStore.getState().alcoholCount
    );
    if (possibleEvents.length === 0) return;
    const event =
      possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
    event.onStart();
    set(() => ({
      activeEvent: event,
    }));

    setTimeout(() => {
      set(() => ({
        activeEvent: null,
      }));
      event.onEnd();
    }, event.duration);
  },

  clearEvent: () => {
    set(() => ({
      activeEvent: null,
    }));
  },
}));

export { eventsList, useEventStore };
