import { getTickets } from "@/features/ticket/queries/get-tickets";

export async function getTicket(ticketId: string) {
  // throw new Error("Network error");
  const tickets = await getTickets();
  return tickets.find((t) => t.id === ticketId);
}
