"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accent?: "default" | "blue" | "green" | "red" | "purple";
}

const accentColors = {
  default: "hover:border-neutral-500/40",
  blue: "hover:border-blue-500/40",
  green: "hover:border-green-500/40",
  red: "hover:border-red-500/40",
  purple: "hover:border-purple-500/40",
};

const accentBadge = {
  default: "bg-neutral-800 text-neutral-300",
  blue: "bg-blue-950 text-blue-300",
  green: "bg-green-950 text-green-300",
  red: "bg-red-950 text-red-300",
  purple: "bg-purple-950 text-purple-300",
};

export function CollapsibleSection({
  id,
  icon,
  title,
  children,
  defaultOpen = true,
  accent = "default",
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className={cn(
        "rounded-xl border border-border/60 bg-card transition-all duration-300 scroll-mt-24",
        accentColors[accent],
        open && "shadow-lg shadow-black/5"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors rounded-xl"
      >
        <span className={cn("text-lg shrink-0 w-8 h-8 flex items-center justify-center rounded-lg", accentBadge[accent])}>
          {icon}
        </span>
        <h2 className="text-[15px] font-semibold flex-1 tracking-tight">{title}</h2>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3 border-t border-border/40 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
