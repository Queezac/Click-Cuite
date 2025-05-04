import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import { useAlcoholUpdater } from "../hooks/useAlcoholUpdate";
import { useRandomEventTrigger } from "../hooks/useRandomTriggerEvent";
import useGameStore from "../stores/game-store";
import conversionUtils from "../utils/conversion";

export const Clicker = () => {
  const imgRef = useRef(null);

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

  const addParticleOnCursor = (e) => {
    const particle = document.createElement("div");
    particle.innerText = `+ ${conversionUtils.mLToString(alcoholPerSecond)}`;
    particle.className = "absolute rounded-full bounceAndUp text-sm text-bold";
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    particle.style.transform = "translate(-50%, -50%)";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "10";
    document.body.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, 2000);
  };

  return (
    <div className="flex-1 bg-[url('background_click.png')] bg-cover bg-center border-2 border-[#5F6EFF] rounded-md p-5 flex flex-col items-center justify-center">
      <p className="text-[2.5vw] font-bold">
        {conversionUtils.mLToString(alcoholCount)}{" "}
      </p>
      <p className="text-[1vw] font-semibold">
        Alcool par seconde : {conversionUtils.mLToString(alcoholPerSecond)}
      </p>
      <button
        onClick={(e) => {
          addParticleOnCursor(e);
          addAlcoholOnClick(alcoholPerClick);
        }}
        className="mt-3 transition-transform transform active:scale-98"
        ref={imgRef}
      >
        <img src="/alcool/huitsix.svg" alt="8.6 click" className="w-180" />
      </button>
    </div>
  );
};
