"use client";

import { Ticket } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { ReactElement } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateTicketStatus } from "@/features/ticket/actions/update-ticket-status";
import { TICKET_STATUS_LABELS } from "@/features/ticket/constants";

export function TicketMoreMenu({
  ticket,
  trigger,
}: {
  ticket: Ticket;
  trigger: ReactElement;
}) {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  const handleUpdateTicketStatus = async (status: string) => {
    const result = await updateTicketStatus(
      ticket.id,
      status as Ticket["status"],
    );

    if (result.status === "SUCCESS") toast.success(result.message);
    else toast.error(result.message);
  };

  const ticketStatusRadioGroup = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.entries(TICKET_STATUS_LABELS).map(([key, value]) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {value}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        {ticketStatusRadioGroup}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
