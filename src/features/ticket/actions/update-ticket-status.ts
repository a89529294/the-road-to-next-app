"use server";

import { Ticket } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const updateTicketStatus = async (
  ticketId: string,
  status: Ticket["status"],
): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    await prisma.ticket.update({
      where: {
        id: ticketId ?? "",
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return Promise.reject(fromErrorToActionState(error));
  }

  revalidatePath(ticketsPath());

  return Promise.resolve(toActionState("SUCCESS", "Ticket status updated"));
};
