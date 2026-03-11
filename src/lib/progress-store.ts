"use client";

const STORAGE_KEY = "onboarding-progress";

export function getProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function setProgress(state: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function toggleStep(
  id: string,
  current: Record<string, boolean>
): Record<string, boolean> {
  const next = { ...current, [id]: !current[id] };
  setProgress(next);
  return next;
}

export const ALL_STEPS = [
  "github-account",
  "github-okta",
  "github-teams",
  "okta-apps",
  "ssh-key",
  "azure-okta",
  "azure-change-mgmt",
  "azure-ad-groups",
  "azure-self-service-course",
  "azure-r1-textiq",
  "azure-r1-privacy",
  "azure-test-access",
  "artifactory",
  "dep-homebrew",
  "dep-java",
  "dep-jenv",
  "dep-docker",
  "dep-git-ssh",
  "dep-azure-cli",
  "setup-hosts",
  "setup-clone",
  "setup-symlink",
  "setup-acr-login",
  "ide-install",
  "ide-import",
  "kubectl-install",
  "app-workspace",
  "app-import-export",
  "app-saved-search",
  "app-data-analysis",
] as const;

export type StepId = (typeof ALL_STEPS)[number];
