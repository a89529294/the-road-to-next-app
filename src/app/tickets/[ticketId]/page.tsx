import { initialTickets } from "@/data";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = initialTickets.find((t) => t.id === ticketId);

  if (!ticket) return <div>ticket not found</div>;

  return (
    <div>
      <h2 className="text-lg">TicketPage: {ticketId}</h2>
      <p className="text-sm">{ticket?.content}</p>
    </div>
  );
};

export default TicketPage;
