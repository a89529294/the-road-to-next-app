import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

export default async function TicketEditPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const ticketId = (await params).ticketId;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-in-from-top"
        title="Edit Ticket"
        description="Edit an existing ticket"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
}
