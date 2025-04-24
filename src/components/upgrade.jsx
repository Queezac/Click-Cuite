import useGameStore from "../stores/game-store";
import upgradeList from "../utils/upgrade";

export const Upgrade = () => {
  const evoluateUpgrade = useGameStore((state) => state.evoluateUpgrade);

  const unlockedEvolutions = upgradeList
    .map((upgrade) => {
      const currentQuantity =
        useGameStore.getState().upgrades?.[upgrade.id]?.count ?? 0;

      const currentEvolutionIndex =
        useGameStore.getState().upgrades?.[upgrade.id]?.currentEvolution ?? -1;

      const availableEvolution = upgrade.evolution?.find(
        (evolution, index) =>
          evolution.unlockAt <= currentQuantity && index > currentEvolutionIndex
      );

      return availableEvolution
        ? {
            upgradeId: upgrade.id,
            evolution: availableEvolution,
          }
        : null;
    })
    .filter(Boolean);

  return (
    <div className="bg-gray-800 rounded-md p-4 flex flex-col h-[14vh] justify-center items-center">
  <div className="flex space-x-3 overflow-x-auto max-w-full flex-nowrap scrollbar-hide">
    {unlockedEvolutions.length > 0 ? (
      unlockedEvolutions.map((evolution) => (
        <button
          onClick={() => evoluateUpgrade(evolution.upgradeId)}
          className="actionButton shrink-0"
          key={evolution.upgradeId}
        >
          <img
            key={evolution.id}
            src={evolution.evolution.image}
            alt="Action 1"
            className="w-[6vh] h-[6vh] shrink-0 mb-2"
          />
        </button>
      ))
    ) : (
      <span className="text-white italic text-center">Améliorations</span>
    )}
  </div>
</div>


  );
};
