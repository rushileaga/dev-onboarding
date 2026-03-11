"use client";

import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

interface InfoBoxProps {
  variant: "note" | "warning" | "tip";
  children: React.ReactNode;
}

const config = {
  note: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-l-blue-500",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-l-amber-500",
    iconColor: "text-amber-500",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-l-green-500",
    iconColor: "text-green-500",
  },
};

export function InfoBox({ variant, children }: InfoBoxProps) {
  const { icon: Icon, bg, border, iconColor } = config[variant];
  return (
    <div className={cn("flex gap-3 rounded-lg border-l-4 p-3 text-sm", bg, border)}>
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconColor)} />
      <div>{children}</div>
    </div>
  );
}
