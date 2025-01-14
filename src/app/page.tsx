import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/heading";
import { ticketsPath } from "@/paths";

export default async function HomePage() {
  console.log("1!!!!");
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

      <Image
        width={500}
        height={500}
        src="https://plus.unsplash.com/premium_photo-1673263586782-8fa0713158e0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
  );
}
