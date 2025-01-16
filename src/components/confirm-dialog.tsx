"use client";

import { cloneElement, ReactElement, useActionState, useState } from "react";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// returning 2 elements so we can render dialog outside of the container of dialogTrigger
export function useConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone",
  trigger,
  action,
}: {
  trigger: ReactElement;
  action: () => Promise<ActionState>;
  title?: string;
  description?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => {
      trigger.props.onClick?.();
      setIsOpen((state) => !state);
    },
  });

  const closeDialog = () => setIsOpen(false);

  console.log(state);
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Form
            action={formAction}
            actionState={state}
            onActionError={closeDialog}
            onActionSuccess={closeDialog}
          >
            <SubmitButton buttonText="Confirm" />
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return {
    dialogTrigger,
    dialog,
  };
}
