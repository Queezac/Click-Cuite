import { create } from "zustand";
import useGameStore from "../stores/game-store";

const { setClickMultiplier, setSecondMultiplier } = useGameStore.getState();

const eventsList = [
  {
    id: 1,
    name: "Happy Hour",
    description: "Tous les gains sont doublés pendant 5 minutes !",
    unlockAt: 1,
    onStart: () => {
      setClickMultiplier(2);
      setSecondMultiplier(2);
    },
    onEnd: () => {
      setClickMultiplier(1);
      setSecondMultiplier(1);
    },
    duration: 5 * 60 * 1000,
  },
  {
    id: 2,
    name: "Panne sèche",
    description: "Tous les gains sont divisés par 2 pendant 5 minutes.",
    unlockAt: 1,
    onStart: () => {
      setClickMultiplier(0.5);
      setSecondMultiplier(0.5);
    },
    onEnd: () => {
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
