import { useEffect, useState } from "react";

export function useDerivedState<T>(state: T) {
  const [derivedState, setDerivedState] = useState<T>(state);

  useEffect(() => {
    setDerivedState(state);
  }, [state]);

  return [derivedState, setDerivedState] as const;
}
