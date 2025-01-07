import { ActionState } from "@/components/form/utils/to-action-state";

export function FieldError({
  actionState,
  name,
}: {
  actionState: ActionState;
  name: string;
}) {
  const errorMessage = actionState.fieldErrors?.[name]?.[0];

  if (!errorMessage) {
    return null;
  }

  return <div className="text-xs text-red-500">{errorMessage}</div>;
}
