import Link from "next/link";
import { Heading } from "@/components/heading";
import { ticketsPath } from "@/paths";

export default async function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Home" description="Your home place to start" />

      <div className="flex flex-1 flex-col items-center">
        <Link
          prefetch={false}
          href={ticketsPath()}
          className="text-sm underline"
        >
          Go to Tickets
        </Link>
      </div>
    </div>
  );
}
