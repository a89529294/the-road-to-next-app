import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

export default function TicketsPage() {
  return (
    <div>
      <h2 className="text-xl">Tickets Page</h2>

      <div>
        {initialTickets.map((ticket) => (
          <div key={ticket.id}>
            <h2 className="text-lg">{ticket.title}</h2>
            <Link href={ticketPath(ticket.id)} className="underline">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
