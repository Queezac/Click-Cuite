import upgradeList from "../utils/upgrade";
import { ShopItem } from "./shopitem";
export const Shop = () => {
  return (
    <div className="bg-gray-800 rounded-md p-4 overflow-y-auto h-full">
      <ul className="list-none p-0">
        {upgradeList.map((upgrade) => {
          return <ShopItem upgrade={upgrade} key={upgrade.id} />;
        })}
      </ul>
    </div>
  );
};
