import { useEffect } from "react";
import useGameStore from "../stores/game-store";

const ALCOHOL_UPDATE_INTERVAL = 100;

export const useAlcoholUpdater = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      useGameStore.getState().updateAlcoholPerSecond();
    }, ALCOHOL_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);
};
