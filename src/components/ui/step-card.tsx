"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepCardProps {
  id: string;
  checked: boolean;
  onToggle: (id: string) => void;
  title: string;
  children: React.ReactNode;
}

export function StepCard({ id, checked, onToggle, title, children }: StepCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3 rounded-lg border p-4 transition-all duration-200",
        checked
          ? "border-green-500/30 bg-green-950/10"
          : "border-border/50 bg-neutral-950/30 hover:border-neutral-600 hover:bg-neutral-900/50"
      )}
    >
      <button
        onClick={() => onToggle(id)}
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all",
          checked
            ? "border-green-500 bg-green-500 text-white"
            : "border-neutral-600 hover:border-neutral-400"
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </button>
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "text-sm font-medium mb-1.5 transition-all",
            checked && "line-through text-muted-foreground"
          )}
        >
          {title}
        </h3>
        <div className="text-[13px] text-muted-foreground space-y-2 leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}
