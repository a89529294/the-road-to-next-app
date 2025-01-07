"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import { toast } from "sonner";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { useDerivedState } from "@/lib/hooks";

const onCreateTicketSuccess = ({
  actionState,
}: {
  actionState: ActionState;
}) => {
  if (actionState.message) toast.success(actionState.message);
};
const onCreateTicketError = ({ actionState }: { actionState: ActionState }) => {
  if (actionState.message) toast.error(actionState.message);
};

export function TicketUpsertForm({ ticket }: { ticket?: Ticket }) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );
  const [derivedActionState, setDerivedActionState] =
    useDerivedState(actionState);

  return (
    <Form
      action={action}
      actionState={actionState}
      onActionSuccess={onCreateTicketSuccess}
      onActionError={onCreateTicketError}
    >
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
        onChange={() => {
          setDerivedActionState({
            ...derivedActionState,
            fieldErrors: {
              ...derivedActionState.fieldErrors,
              title: undefined,
            },
          });
        }}
      />
      <FieldError actionState={derivedActionState} name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
        onChange={() => {
          setDerivedActionState({
            ...derivedActionState,
            fieldErrors: {
              ...derivedActionState.fieldErrors,
              content: undefined,
            },
          });
        }}
      />
      <FieldError actionState={derivedActionState} name="content" />
      <SubmitButton buttonText={ticket ? "Update" : "Create"} />
      {actionState.message}
    </Form>
  );
}
