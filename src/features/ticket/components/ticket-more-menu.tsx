"use client";

import { Ticket } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTicket } from "@/features/ticket/actions/delete-ticket";
import { updateTicketStatus } from "@/features/ticket/actions/update-ticket-status";
import { TICKET_STATUS_LABELS } from "@/features/ticket/constants";

export function TicketMoreMenu({
  ticket,
  trigger,
}: {
  ticket: Ticket;
  trigger: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const { dialogTrigger: deleteButton, dialog: deleteDialog } =
    useConfirmDialog({
      trigger: (
        <DropdownMenuItem>
          <LucideTrash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      ),
      action: deleteTicket.bind(null, ticket.id),
    });

  const handleUpdateTicketStatus = async (status: string) => {
    const promise = updateTicketStatus(ticket.id, status as Ticket["status"]);

    toast.promise(promise, {
      loading: "Updating ticket status...",
      success: (result) => toast.success(result.message),
      error: (result) => toast.error(result.message),
    });
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
    <>
      {deleteDialog}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          {ticketStatusRadioGroup}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
