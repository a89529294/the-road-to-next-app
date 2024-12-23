import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement, ReactElement } from "react";
import { cn } from "@/lib/utils";

export function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: {
  label: string;
  icon?: ReactElement;
  button?: ReactElement;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-2 self-center">
      {cloneElement(icon, {
        className: cn("w-16 h-16", icon.props.className),
      })}
      <h2 className="text-center text-lg">{label}</h2>
      {cloneElement(button, {
        className: cn("h-10", button.props.className),
      })}
    </div>
  );
}
