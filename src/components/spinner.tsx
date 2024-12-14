import { LucideLoaderCircle } from "lucide-react";

export function Spinner() {
  return (
    <div className="flex flex-1 items-center justify-center self-center">
      <LucideLoaderCircle className="size-16 animate-spin text-center" />
    </div>
  );
}
