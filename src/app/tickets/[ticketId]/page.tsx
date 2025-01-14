import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  console.log("Ticket page renders");
  const ticket = await getTicket((await params).ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex animate-fade-in-from-top justify-center">
      <TicketItem ticket={ticket} isDetails />
    </div>
  );
};

export default TicketPage;
