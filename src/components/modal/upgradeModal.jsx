import useGameStore from "../../stores/game-store";
import Modal from "./modal";

const UpgradeModal = ({ isOpen, onClose }) => {
  const upgrades = useGameStore.getState().upgrades;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {Object.entries(upgrades).map(([key, upgrade], index) => (
        <div key={key} className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">{`Amélioration ${index + 1}`}</h2>
          <p>{`Niveau actuel : ${upgrade.currentEvolution}`}</p>
          <p>{`Nombre d'améliorations : ${upgrade.count}`}</p>
        </div>
      ))}
    </Modal>
  );
};

export default UpgradeModal;
