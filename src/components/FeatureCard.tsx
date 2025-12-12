import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "danger" | "safe" | "warning";
  className?: string;
}

const variantStyles = {
  default: "border-border bg-card",
  danger: "border-primary/30 bg-primary/5",
  safe: "border-safe/30 bg-safe/5",
  warning: "border-warning/30 bg-warning/5",
};

const iconStyles = {
  default: "bg-secondary text-foreground",
  danger: "gradient-danger text-primary-foreground",
  safe: "gradient-safe text-safe-foreground",
  warning: "bg-warning text-warning-foreground",
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-all hover:scale-[1.02] hover:shadow-card",
        variantStyles[variant],
        className
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
          iconStyles[variant]
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold font-display text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
