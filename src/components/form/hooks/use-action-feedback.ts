import { useEffect } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

export function useActionFeedback(
  actionState: ActionState,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: ({ actionState }: { actionState: ActionState }) => void;
    onError?: ({ actionState }: { actionState: ActionState }) => void;
  },
) {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      onError?.({ actionState });
    }
  }, [actionState, onSuccess, onError]);
}
