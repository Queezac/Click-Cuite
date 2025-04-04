import { useShallow } from "zustand/shallow";
import { useEventStore } from "../stores/event-store";

export const Event = () => {
  const { activeEvent } = useEventStore(
    useShallow((state) => ({
      activeEvent: state.activeEvent,
    }))
  );

  return (
    <div>
      {/* Affichage dynamique de l'image de l'événement */}
      <img
        src={activeEvent ? activeEvent.image : "/evenement/pasdevenement.png"}
        alt=""
        className="w-full"
      />
      {/* Événements */}
      <div className="bg-gray-800 rounded-b-lg p-4">
        {activeEvent ? (
          <div>
            <p className="text-center">Événement actif : {activeEvent.name}</p>
            <p className="text-center">{activeEvent.description}</p>
          </div>
        ) : (
          <p className="text-center italic">Attendez un événement</p>
        )}
      </div>
    </div>
  );
};
