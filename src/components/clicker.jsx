import { useShallow } from "zustand/shallow";
import { useAlcoholUpdater } from "../hooks/useAlcoholUpdate";
import { useRandomEventTrigger } from "../hooks/useRandomTriggerEvent";
import useGameStore from "../stores/game-store";
import conversionUtils from "../utils/conversion";

export const Clicker = () => {
  const { alcoholCount, alcoholPerClick, alcoholPerSecond, addAlcoholOnClick } =
    useGameStore(
      useShallow((state) => ({
        alcoholCount: state.alcoholCount,
        alcoholPerClick: state.alcoholPerClick,
        alcoholPerSecond: state.alcoholPerSecond,
        addAlcoholOnClick: state.addAlcoholOnClick,
        addAlcoholOnSecond: state.addAlcoholOnSecond,
      }))
    );

  useAlcoholUpdater();
  useRandomEventTrigger();

  return (
    <div className="flex-1 bg-[url('background_click.png')] bg-cover bg-center border-2 border-[#5F6EFF] rounded-md p-5 flex flex-col items-center justify-center">
      <p className="text-[2.5vw] font-bold">
        {conversionUtils.mLToString(alcoholCount)}{" "}
      </p>
      <p className="text-[1vw] font-semibold">
        Alcool par seconde : {conversionUtils.mLToString(alcoholPerSecond)}
      </p>
      <button
        onClick={() => addAlcoholOnClick(alcoholPerClick)}
        className="mt-3 transition-transform transform active:scale-98"
      >
        <img src="/alcool/huitsix.svg" alt="8.6 click" className="w-180" />
      </button>
    </div>
  );
};
