import { cn } from "@/lib/utils";

type BadgeProps = {
  label: string;
  variant?: "todo" | "progress" | "done";
};

export default function Badge({ label, variant = "todo" }: BadgeProps) {
  const variants = {
    todo: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
    progress: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    done: "border-green-500/30 bg-green-500/10 text-green-300",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
      )}
    >
      {label}
    </span>
  );
}
