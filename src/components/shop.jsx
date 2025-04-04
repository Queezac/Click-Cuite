import useGameStore from "../stores/game-store";
import conversionUtils from "../utils/conversion";
import upgradeList from "../utils/upgrade";

export const Shop = () => {
  const { alcoholCount, buyUpgrade, upgrades } = useGameStore();

  return (
    <div className="bg-gray-800 rounded-md p-4 overflow-y-auto h-full">
      <ul className="list-none p-0">
        {upgradeList.map((upgrade) => {
          const currentQuantity = upgrades[upgrade.id]?.count || 0;
          const cost = Math.floor(
            upgrade.baseCost *
              Math.pow(upgrade.upgradeCostMultiplier, currentQuantity)
          );

          return (
            <button
              key={upgrade.id}
              onClick={() => buyUpgrade(upgrade.id)}
              disabled={alcoholCount < cost}
              className={`w-full px-3 py-2 mt-2 rounded-[10px] text-white flex justify-between items-center border-1 border-[#313b47]
                        ${
                          alcoholCount >= cost
                            ? "bg-[#14171F] border-[#14171F] cursor-pointer hover:border-1 hover:border-[#5F6EFF] hover:shadow-inner active:bg-[#0d141b]"
                            : "bg-[#313B47]"
                        }`}
            >
              <div className="flex items-center gap-2 w-[60%]">
                <img
                  src={upgrade.image}
                  alt={upgrade.name}
                  className={`w-10 h-10 flex-shrink-0 ${
                    alcoholCount < cost ? "opacity-50" : ""
                  }`}
                />
                <p
                  className={`text-[0.7vw] truncate ${
                    alcoholCount < cost ? "opacity-50" : ""
                  }`}
                >
                  {upgrade.name}
                </p>
              </div>

              <div className="flex items-center w-[38%]">
                <strong
                  className={`text-[#5F6EFF] text-center w-[30%] ${
                    alcoholCount < cost ? "opacity-50" : ""
                  }`}
                >
                  {currentQuantity}
                </strong>
                <strong
                  className={`text-[0.8vw] text-right w-[70%] ml-auto ${
                    alcoholCount < cost ? "opacity-50" : ""
                  }`}
                >
                  {conversionUtils.mLToString(cost)}
                </strong>
              </div>
            </button>
          );
        })}
      </ul>
    </div>
  );
};
