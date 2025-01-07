import { ReactNode } from "react";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { ActionState } from "@/components/form/utils/to-action-state";

export function Form({
  action,
  children,
  actionState,
  onActionSuccess,
  onActionError,
}: {
  action: (payload: FormData) => void;
  children: ReactNode;
  actionState: ActionState;
  onActionSuccess?: ({ actionState }: { actionState: ActionState }) => void;
  onActionError?: ({ actionState }: { actionState: ActionState }) => void;
}) {
  useActionFeedback(actionState, {
    onSuccess: onActionSuccess,
    onError: onActionError,
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}
