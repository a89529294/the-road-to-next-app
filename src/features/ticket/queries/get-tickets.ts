import { initialTickets } from "@/data";
import { Ticket } from "@/features/ticket/types";

export async function getTickets() {
  // throw new Error("Network error");
  await new Promise((r) => setTimeout(r, 2000));
  return new Promise((r) => r(initialTickets)) as Promise<Ticket[]>;
}
