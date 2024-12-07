import Link from "next/link";
import { ticketsPath } from "@/paths";
import { Heading } from "@/components/heading";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title='Home' description="Your home place to start"/>

      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="text-sm underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
}
