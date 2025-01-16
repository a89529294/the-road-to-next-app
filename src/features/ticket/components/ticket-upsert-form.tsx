"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import { DatePicker } from "@/components/date-picker";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { useDerivedState } from "@/lib/hooks";
import { fromCent } from "@/utils/currency";

export function TicketUpsertForm({ ticket }: { ticket?: Ticket }) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );
  const [derivedActionState, setDerivedActionState] =
    useDerivedState(actionState);

  const resetErrorField = (name: string) => {
    setDerivedActionState({
      ...derivedActionState,
      fieldErrors: {
        ...derivedActionState.fieldErrors,
        [name]: undefined,
      },
    });
  };

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
        onChange={() => {
          resetErrorField("title");
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
          resetErrorField("content");
        }}
      />
      <FieldError actionState={derivedActionState} name="content" />

      <div className="mb-1 flex gap-x-2">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>

          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            key={actionState.timeStamp}
            onChange={() => {
              resetErrorField("deadline");
            }}
          />
          <FieldError actionState={derivedActionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")
            }
            onChange={() => {
              resetErrorField("bounty");
            }}
          />
          <FieldError actionState={derivedActionState} name="bounty" />
        </div>
      </div>
      <SubmitButton buttonText={ticket ? "Update" : "Create"} />
    </Form>
  );
}
