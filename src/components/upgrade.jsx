import useGameStore from "../stores/game-store";
import upgradeList from "../utils/upgrade";
import { ToolTip } from "./ui/tooltip";

export const Upgrade = () => {
  const evoluateUpgrade = useGameStore((state) => state.evoluateUpgrade);
  const upgrades = useGameStore((state) => state.upgrades);

  const unlockedEvolutions = upgradeList
    .map((upgrade) => {
      const currentQuantity = upgrades[upgrade.id]?.count ?? 0;

      const currentEvolutionIndex =
        upgrades[upgrade.id]?.currentEvolution ?? -1;

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
      <div className="flex space-x-3 overflow-x-auto max-w-full flex-wrap scrollbar-hide">
        {unlockedEvolutions.length > 0 ? (
          unlockedEvolutions.map((evolution) => (
            <div key={evolution.upgradeId}>
              <ToolTip
                title={evolution.evolution.name}
                text={evolution.evolution.description}
                direction="bottom"
              >
                <button
                  onClick={() => evoluateUpgrade(evolution.upgradeId)}
                  className="actionButton shrink-0"
                  key={evolution.upgradeId}
                >
                  <img
                    key={evolution.id}
                    src={evolution.evolution.image}
                    alt="Action 1"
                    className="w-[6vh] h-[6vh] shrink-0"
                  />
                </button>
              </ToolTip>
            </div>
          ))
        ) : (
          <span className="text-white italic text-center">Améliorations</span>
        )}
      </div>
    </div>
  );
};
