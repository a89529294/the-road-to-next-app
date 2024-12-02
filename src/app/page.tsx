import Link from "next/link";
import { ticketsPath } from "@/paths";

export default function HomePage() {
  return (
    <div>
      <h2 className="text-xl">Home Page</h2>

      <Link href={ticketsPath()}>Go To Tickets</Link>
    </div>
  );
}
