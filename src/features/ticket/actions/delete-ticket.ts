"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookie } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (id: string): Promise<ActionState> => {
  try {
    await prisma.ticket.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    return fromErrorToActionState(e);
  }

  setCookie("toast", "Ticket deleted");
  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
