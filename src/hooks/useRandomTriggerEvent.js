import { useEffect } from "react";
import { useEventStore } from "../stores/event-store";

const TRIGGER_EVENT_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const useRandomEventTrigger = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      useEventStore.getState().triggerRandomEventIfNeeded();
    }, TRIGGER_EVENT_INTERVAL); // 5 minutes
    return () => clearInterval(interval);
  }, []);
};
