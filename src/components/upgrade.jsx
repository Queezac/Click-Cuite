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
    <div className="bg-gray-800 rounded-md p-4 flex flex-col">
      <div className="flex space-x-3">
        {unlockedEvolutions.map((evolution) => (
          <button
            onClick={() => evoluateUpgrade(evolution.upgradeId)}
            className="actionButton"
            key={evolution.upgradeId}
          >
            <img
              key={evolution.id}
              src={evolution.evolution.image}
              alt="Action 1"
              className="w-15 h-15"
            />
          </button>
        ))}{" "}
        {/* Améliorations */}
      </div>
    </div>
  );
};
