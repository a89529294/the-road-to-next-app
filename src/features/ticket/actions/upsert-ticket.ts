"use server";

import { subDays } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookie } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.coerce
    .date({ message: "Is required" })
    .min(subDays(new Date(), 1), { message: "Must be in the future" })
    .transform((date) => {
      return date.toISOString().split("T")[0];
    }),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
  ticketId: string | undefined,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        id: ticketId ?? "",
      },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (ticketId) {
    setCookie("toast", "Ticket updated");
    redirect(ticketPath(ticketId));
  }

  return toActionState("SUCCESS", "Ticket created successfully");
};
