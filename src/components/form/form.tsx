import { ReactNode, useCallback, useRef } from "react";
import { toast } from "sonner";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { ActionState } from "@/components/form/utils/to-action-state";

const onSuccessBase = ({ actionState }: { actionState: ActionState }) => {
  if (actionState.message) toast.success(actionState.message);
};

const onErrorBase = ({ actionState }: { actionState: ActionState }) => {
  if (actionState.message) toast.error(actionState.message);
};

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
  const onActionSuccessRef = useRef(onActionSuccess);
  const onActionErrorRef = useRef(onActionError);
  const actionStateRef = useRef(actionState);

  onActionSuccessRef.current = onActionSuccess;
  onActionErrorRef.current = onActionError;
  actionStateRef.current = actionState;

  const onSuccess = useCallback(() => {
    onSuccessBase({ actionState: actionStateRef.current });
    onActionSuccessRef.current?.({ actionState: actionStateRef.current });
  }, []);

  const onError = useCallback(() => {
    onErrorBase({ actionState: actionStateRef.current });
    onActionErrorRef.current?.({ actionState: actionStateRef.current });
  }, []);

  useActionFeedback(actionStateRef.current, {
    onSuccess,
    onError,
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}
