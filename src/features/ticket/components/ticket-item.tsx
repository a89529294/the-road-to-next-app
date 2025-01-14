import { Ticket } from "@prisma/client";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketMoreMenu } from "@/features/ticket/components/ticket-more-menu";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

export async function TicketItem({
  ticket,
  isDetails,
}: {
  ticket: Ticket;
  isDetails?: boolean;
}) {
  const detailButton = (
    <Button asChild variant="outline" size={"icon"}>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="size-4" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button asChild variant="outline" size={"icon"}>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="size-4" />
      </Link>
    </Button>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="size-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={cn("flex w-full gap-x-1", {
        "max-w-[420px]": !isDetails,
        "max-w-[580px]": isDetails,
      })}
    >
      <Card className="min-w-0 flex-grow">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p
            className={cn("whitespace-break-spaces", {
              "line-clamp-3": !isDetails,
            })}
          >
            {ticket.content}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetails ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}
