import { Ticket } from "@prisma/client";
import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";
import { ReactElement } from "react";

export const TICKET_ICONS: Record<Ticket["status"], ReactElement> = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheck />,
};

export const TICKET_STATUS_LABELS: Record<Ticket["status"], string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};
