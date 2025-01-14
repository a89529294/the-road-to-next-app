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
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Ticket status updated");
};
