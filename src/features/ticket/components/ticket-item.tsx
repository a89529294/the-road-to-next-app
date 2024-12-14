import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { Ticket } from "@/features/ticket/types";
import { cn } from "@/lib/utils";
import { ticketPath } from "@/paths";

export function TicketItem({
  ticket,
  isDetails,
}: {
  ticket: Ticket;
  isDetails?: boolean;
}) {
  const detailButton = (
    <Button asChild variant="outline" size={"icon"}>
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="size-4" />
      </Link>
    </Button>
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
      </Card>

      {!isDetails && (
        <div className="flex flex-col gap-y-1">{detailButton}</div>
      )}
    </div>
  );
}
