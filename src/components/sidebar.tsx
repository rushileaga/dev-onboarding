"use client";

import { cn } from "@/lib/utils";
import {
  Github,
  KeyRound,
  Cloud,
  Package,
  Wrench,
  Settings,
  Monitor,
  Terminal,
  Play,
  Server,
  Container,
  LayoutDashboard,
  Workflow,
  Database,
  Bug,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  progress: number;
  total: number;
  collapsed: boolean;
  onToggle: () => void;
}

const navSections = [
  {
    title: "Access Setup",
    items: [
      { href: "#github", label: "GitHub Access", icon: Github },
      { href: "#okta-apps", label: "Okta Apps", icon: KeyRound },
      { href: "#ssh", label: "SSH Keys", icon: KeyRound },
      { href: "#azure", label: "Azure Environment", icon: Cloud },
      { href: "#artifactory", label: "Artifactory", icon: Package },
    ],
  },
  {
    title: "Developer Setup",
    items: [
      { href: "#dependencies", label: "Install Dependencies", icon: Wrench },
      { href: "#first-time-setup", label: "First-Time Setup", icon: Settings },
      { href: "#ide", label: "IDE Setup", icon: Monitor },
      { href: "#kubectl", label: "Kubectl", icon: Terminal },
    ],
  },
  {
    title: "Working with Platform",
    items: [
      { href: "#run-app", label: "Running the App", icon: Play },
      { href: "#kubernetes", label: "Kubernetes & Mongo", icon: Server },
      { href: "#docker-push", label: "Docker Image Push", icon: Container },
    ],
  },
  {
    title: "Architecture",
    items: [
      { href: "#arch-overview", label: "Platform Overview", icon: LayoutDashboard },
      { href: "#arch-pipeline", label: "Detection Pipeline", icon: Workflow },
      { href: "#arch-flow", label: "Data Flow", icon: Workflow },
      { href: "#arch-api", label: "Backend API", icon: Server },
      { href: "#arch-ui", label: "Frontend (UI)", icon: Monitor },
      { href: "#arch-mongo", label: "MongoDB", icon: Database },
      { href: "#arch-liquibase", label: "Liquibase", icon: Database },
      { href: "#arch-debug", label: "Debugging", icon: Bug },
    ],
  },
];

export function Sidebar({ progress, total, collapsed, onToggle }: SidebarProps) {
  const pct = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <>
      <button
        onClick={onToggle}
        className={cn(
          "fixed top-4 z-[110] rounded-lg bg-neutral-900 text-white p-2 shadow-lg transition-all duration-300 hover:bg-neutral-700",
          collapsed ? "left-4" : "left-[268px]"
        )}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <aside
        className={cn(
          "fixed top-0 left-0 z-[100] h-screen w-[260px] bg-neutral-950 text-white overflow-y-auto transition-transform duration-300 flex flex-col",
          collapsed && "-translate-x-[260px]"
        )}
      >
        <div className="p-5 border-b border-white/10">
          <h2 className="text-sm font-bold tracking-wide">DEV Onboarding</h2>
          <p className="text-[11px] text-white/50 mt-0.5">Privacy / TextIQ Team</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {navSections.map((section) => (
            <div key={section.title} className="mb-1">
              <div className="px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                {section.title}
              </div>
              {section.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-5 py-2 text-[13px] text-white/75 hover:text-white hover:bg-white/10 transition-colors border-l-2 border-transparent hover:border-blue-400"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-[11px] text-white/50 mb-2">Onboarding Progress</div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-[11px] text-white/50 mt-1 text-right">
            {progress} / {total} ({pct}%)
          </div>
        </div>
      </aside>
    </>
  );
}
