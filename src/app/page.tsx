"use client";

import { useState, useEffect, useCallback } from "react";
import { GradientDots } from "@/components/ui/gradient-dots";
import { ShineBorder } from "@/components/ui/shine-border";
import { Sidebar } from "@/components/sidebar";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { StepCard } from "@/components/ui/step-card";
import { CodeBlock } from "@/components/ui/code-block";
import { InfoBox } from "@/components/ui/info-box";
import { Lightbox } from "@/components/ui/lightbox";
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";
import { ALL_STEPS, getProgress, toggleStep } from "@/lib/progress-store";

/* eslint-disable @next/next/no-img-element */

export default function Home() {
  const [progress, setProgressState] = useState<Record<string, boolean>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => { setProgressState(getProgress()); }, []);

  const handleToggle = useCallback((id: string) => {
    setProgressState((prev) => toggleStep(id, prev));
  }, []);

  const checked = (id: string) => !!progress[id];
  const doneCount = ALL_STEPS.filter((s) => progress[s]).length;
  const pct = ALL_STEPS.length > 0 ? Math.round((doneCount / ALL_STEPS.length) * 100) : 0;

  const Img = ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} className="rounded-lg border border-border/50 mt-3 cursor-pointer hover:opacity-90 transition-opacity max-w-full" onClick={() => setLightboxSrc(src)} />
  );

  return (
    <div className="min-h-screen bg-background">
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      <Sidebar progress={doneCount} total={ALL_STEPS.length} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? "ml-0" : "ml-[260px]"}`}>

        {/* ── Hero ── */}
        <header className="relative overflow-hidden border-b border-border/40">
          <GradientDots duration={25} className="opacity-30" />
          <div className="relative z-10 px-8 pt-24 pb-16 max-w-4xl mx-auto text-center">
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">Privacy / TextIQ Engineering</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              New DEV Hire{" "}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                Onboarding
              </span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Everything you need to get set up — access, tooling, architecture, and reference guides. Check off steps as you go.
            </p>
            <ShineBorder
              className="mt-8 mx-auto inline-flex items-center gap-4 rounded-full bg-card/90 backdrop-blur px-6 py-3 border-none min-w-0"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderRadius={50}
              borderWidth={1}
              duration={8}
            >
              <div className="h-2 w-40 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm font-semibold tabular-nums">{pct}%</span>
              <span className="text-xs text-muted-foreground">{doneCount}/{ALL_STEPS.length} steps</span>
            </ShineBorder>
          </div>
        </header>

        {/* ── Features ── */}
        <section className="border-b border-border/40">
          <FeaturesSectionWithHoverEffects />
        </section>

        {/* ── Main Content ── */}
        <main className="max-w-3xl mx-auto px-6 py-10 space-y-5">

          {/* ════════════════ ACCESS SETUP ════════════════ */}
          <div className="section-divider">
            <h2 className="text-lg font-bold tracking-tight text-muted-foreground uppercase text-xs">Access Setup</h2>
          </div>

          <CollapsibleSection id="github" icon="🖥" title="Step 1 — GitHub Access" accent="blue">
            <StepCard id="github-account" checked={checked("github-account")} onToggle={handleToggle} title="Create a GitHub Account">
              <p>Create an account at <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">github.com</a> if you don&apos;t have one.</p>
            </StepCard>
            <StepCard id="github-okta" checked={checked("github-okta")} onToggle={handleToggle} title="Request Okta Apps for GitHub Orgs">
              <p>Go to <strong>Okta</strong> and request access to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li><strong>RelativityOne</strong> — <a href="https://github.com/relativityone" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">github.com/relativityone</a></li>
                <li><strong>RelativityDev</strong> — <a href="https://github.com/relativitydev" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">github.com/relativitydev</a></li>
              </ul>
            </StepCard>
            <StepCard id="github-teams" checked={checked("github-teams")} onToggle={handleToggle} title="Get Added to GitHub Teams">
              <p>Give your manager your GitHub ID. Contact <strong>Tools Support</strong> or <strong>Krzysztof Żurawski&apos;s team</strong> for org access.</p>
              <InfoBox variant="note">You should end up with access to both orgs. Tools Support handles separate org access.</InfoBox>
            </StepCard>
          </CollapsibleSection>

          <CollapsibleSection id="okta-apps" icon="🔐" title="Step 2 — Okta Apps" accent="blue">
            <StepCard id="okta-apps" checked={checked("okta-apps")} onToggle={handleToggle} title="Request Additional Okta Apps">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>PagerDuty</strong></li>
                <li><strong>Figma</strong> — diagraming and workflows</li>
                <li><strong>LucidChart</strong></li>
              </ul>
            </StepCard>
          </CollapsibleSection>

          <CollapsibleSection id="ssh" icon="🔑" title="Step 3 — SSH Key Setup" accent="blue">
            <p className="text-sm text-muted-foreground">You&apos;ll need your public key for several access tickets.</p>
            <div className="rounded-lg bg-neutral-950/50 p-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">1. Check for existing keys</h4>
              <CodeBlock language="bash">{`cd ~/.ssh && ls id_*`}</CodeBlock>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2. Generate a new key (if needed)</h4>
              <CodeBlock language="bash">{`ssh-keygen -t ed25519 -C "your_email@example.com"`}</CodeBlock>
              <InfoBox variant="note">Legacy fallback: <code className="text-xs bg-muted px-1 rounded">ssh-keygen -t rsa -b 4096 -C &quot;...&quot;</code></InfoBox>
            </div>
            <StepCard id="ssh-key" checked={checked("ssh-key")} onToggle={handleToggle} title="SSH key generated and public key ready">
              <p>Press Enter for defaults, set a passphrase, then use the key for access requests.</p>
            </StepCard>
          </CollapsibleSection>

          <CollapsibleSection id="azure" icon="☁" title="Step 4 — Azure Environment Access" accent="blue">
            <StepCard id="azure-okta" checked={checked("azure-okta")} onToggle={handleToggle} title="Request Azure Okta Apps">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Harness</strong> — ask manager to invite you to Text IQ Privacy project</li>
                <li><strong>New Relic</strong> — may already be added</li>
              </ul>
            </StepCard>
            <StepCard id="azure-change-mgmt" checked={checked("azure-change-mgmt")} onToggle={handleToggle} title="Complete Change Management Course (Workday)">
              <p>Then request Creator access on Relativity Service Desk.</p>
              <InfoBox variant="warning">Required for full JIRA access.</InfoBox>
            </StepCard>
            <StepCard id="azure-ad-groups" checked={checked("azure-ad-groups")} onToggle={handleToggle} title="Request AD Group Access">
              <p>File an IT service desk ticket for <strong>Dev_Group</strong> and <strong>Development</strong> AD groups. Needed for Harness workflows.</p>
            </StepCard>
            <StepCard id="azure-self-service-course" checked={checked("azure-self-service-course")} onToggle={handleToggle} title="Complete RelOne Self Service Access Request Course (Workday)">
              <p>Required before filing the two security tickets below.</p>
            </StepCard>
            <StepCard id="azure-r1-textiq" checked={checked("azure-r1-textiq")} onToggle={handleToggle} title="Security Ticket: R1-textiq AD Group">
              <div className="rounded-md bg-neutral-950/50 p-3 text-xs font-mono space-y-0.5">
                <p><span className="text-muted-foreground">Title:</span> Addition to R1-textiq AD Group</p>
                <p><span className="text-muted-foreground">Desc:</span> As a textiq developer, I need R1-textiq AD access</p>
                <p><span className="text-muted-foreground">Component:</span> R1-TextIQ</p>
              </div>
            </StepCard>
            <StepCard id="azure-r1-privacy" checked={checked("azure-r1-privacy")} onToggle={handleToggle} title="Security Ticket: R1-PrivacyByDiscoveryPlus AD Group">
              <div className="rounded-md bg-neutral-950/50 p-3 text-xs font-mono space-y-0.5">
                <p><span className="text-muted-foreground">Title:</span> Addition to R1-PrivacyByDiscoveryPlus AD Group</p>
                <p><span className="text-muted-foreground">Desc:</span> As a textiq developer, I need R1-PrivacyByDiscoveryPlus AD access</p>
                <p><span className="text-muted-foreground">Component:</span> R1-PrivacyByDiscoveryPlus</p>
              </div>
            </StepCard>
            <StepCard id="azure-test-access" checked={checked("azure-test-access")} onToggle={handleToggle} title="Verify Azure Access">
              <ol className="list-decimal pl-5 space-y-1">
                <li>Login to <a href="https://portal.azure.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">portal.azure.com</a></li>
                <li>User icon → Switch directory</li>
                <li>Confirm: <strong>Relativity</strong> (<code className="text-xs bg-muted px-1 rounded">kcura.onmicrosoft.com</code>) + <strong>RelativityOne</strong> (<code className="text-xs bg-muted px-1 rounded">relativity.one</code>)</li>
                <li>Access the DEV ACR</li>
              </ol>
            </StepCard>
          </CollapsibleSection>

          <CollapsibleSection id="artifactory" icon="📦" title="Step 5 — Artifactory Access" accent="blue">
            <StepCard id="artifactory" checked={checked("artifactory")} onToggle={handleToggle} title="Add Artifactory Okta Apps">
              <p>Add <strong>RelativityOne Artifactory</strong> and <strong>Relativity Artifactory</strong> from Okta. Open both with <strong>VPN enabled</strong>.</p>
            </StepCard>
          </CollapsibleSection>

          {/* Access Checklist */}
          <CollapsibleSection id="checklist" icon="✅" title="Access Verification Checklist" accent="green">
            <p className="text-sm text-muted-foreground">After all tickets resolve, verify you can reach every service:</p>
            <table className="arch-table mt-3">
              <thead><tr><th>Service</th><th>Link</th></tr></thead>
              <tbody>
                <tr><td>Slack</td><td>Via Okta</td></tr>
                <tr><td>Einstein (Confluence)</td><td><a href="https://relativity-oda.atlassian.net" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">relativity-oda.atlassian.net</a></td></tr>
                <tr><td>Reuben Board</td><td><a href="https://jira.kcura.com/secure/RapidBoard.jspa?rapidView=1684" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Jira Board 1684</a></td></tr>
                <tr><td>Fusion Board</td><td><a href="https://jira.kcura.com/secure/RapidBoard.jspa?rapidView=1755" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Jira Board 1755</a></td></tr>
                <tr><td>PI Detection Board</td><td><a href="https://jira.kcura.com/secure/RapidBoard.jspa?rapidView=2005" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Jira Board 2005</a></td></tr>
                <tr><td>New Relic</td><td><a href="https://onenr.io/0LREo81yqQa" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Production Dashboard</a></td></tr>
                <tr><td>RelativityOne Artifactory</td><td>Via Okta (VPN)</td></tr>
                <tr><td>Relativity Artifactory</td><td>Via Okta (VPN)</td></tr>
              </tbody>
            </table>
            <InfoBox variant="note">JIRA access must be raised with <strong>Tools Support</strong>. Contact IT support to forward the request.</InfoBox>
          </CollapsibleSection>

          {/* ════════════════ DEVELOPER SETUP ════════════════ */}
          <div className="section-divider">
            <h2 className="text-lg font-bold tracking-tight text-muted-foreground uppercase text-xs">Developer Setup</h2>
          </div>

          <CollapsibleSection id="dependencies" icon="🔧" title="Step 6 — Install Dependencies" accent="purple">
            <StepCard id="dep-homebrew" checked={checked("dep-homebrew")} onToggle={handleToggle} title="Install Homebrew">
              <CodeBlock language="bash">{`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}</CodeBlock>
            </StepCard>
            <StepCard id="dep-java" checked={checked("dep-java")} onToggle={handleToggle} title="Install Java (Temurin) 8 and 17">
              <CodeBlock language="bash">{`brew install --cask temurin@8
brew install --cask temurin@17`}</CodeBlock>
            </StepCard>
            <StepCard id="dep-jenv" checked={checked("dep-jenv")} onToggle={handleToggle} title="Install JEnv (Java version switcher)">
              <CodeBlock language="bash">{`brew install jenv`}</CodeBlock>
              <p>Add to <code className="text-xs bg-muted px-1 rounded">~/.zshrc</code>:</p>
              <CodeBlock language="bash">{`export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"`}</CodeBlock>
            </StepCard>
            <StepCard id="dep-docker" checked={checked("dep-docker")} onToggle={handleToggle} title="Install Docker Desktop">
              <ul className="list-disc pl-5 space-y-1">
                <li>Install <strong>Docker Desktop for Mac</strong></li>
                <li>Sign in via Okta chiclet</li>
                <li>Set memory to <strong>12 GB</strong> — Docker → Preferences → Resources</li>
              </ul>
            </StepCard>
            <StepCard id="dep-git-ssh" checked={checked("dep-git-ssh")} onToggle={handleToggle} title="Git Config">
              <CodeBlock language="bash">{`git config --global user.email "<relativity email>"`}</CodeBlock>
            </StepCard>
            <StepCard id="dep-azure-cli" checked={checked("dep-azure-cli")} onToggle={handleToggle} title="Install Azure CLI">
              <CodeBlock language="bash">{`brew install azure-cli`}</CodeBlock>
            </StepCard>
          </CollapsibleSection>

          <CollapsibleSection id="first-time-setup" icon="⚙" title="Step 7 — First-Time Project Setup" accent="purple">
            <StepCard id="setup-hosts" checked={checked("setup-hosts")} onToggle={handleToggle} title="Update /etc/hosts">
              <CodeBlock>{`127.0.0.1 mongo elasticsearch redis`}</CodeBlock>
              <p>Allows local services to find Docker network services.</p>
            </StepCard>
            <StepCard id="setup-clone" checked={checked("setup-clone")} onToggle={handleToggle} title="Clone the Privacy Repo">
              <CodeBlock language="bash">{`git clone https://github.com/relativityone/privacy-privacyiq`}</CodeBlock>
              <InfoBox variant="note">Ask the team to add you to the <strong>privacy-backend</strong> GitHub team first.</InfoBox>
            </StepCard>
            <StepCard id="setup-symlink" checked={checked("setup-symlink")} onToggle={handleToggle} title="Create Data Symlink">
              <CodeBlock language="bash">{`sudo mkdir /opt/privacy
sudo chown $(whoami) /opt/privacy
ln -s <path-to-privacyiq>/data /opt/privacy/data`}</CodeBlock>
            </StepCard>
            <StepCard id="setup-acr-login" checked={checked("setup-acr-login")} onToggle={handleToggle} title="Login to Azure Container Registry">
              <CodeBlock language="bash">{`az login
az acr login -n r1k8sacrdev --subscription 'pd - dev - k8s - msdn'`}</CodeBlock>
            </StepCard>
            <InfoBox variant="warning">The full Privacy Stack is not run locally. Code is pushed to dev containers and tested in Dev/Reg environments.</InfoBox>
          </CollapsibleSection>

          <CollapsibleSection id="ide" icon="🖥" title="Step 8 — IDE Setup (IntelliJ)" accent="purple">
            <StepCard id="ide-install" checked={checked("ide-install")} onToggle={handleToggle} title="Install IntelliJ IDEA with Maven Plugin">
              <p>Any IDE works, but IntelliJ is team standard.</p>
            </StepCard>
            <StepCard id="ide-import" checked={checked("ide-import")} onToggle={handleToggle} title="Import Privacy Project">
              <ul className="list-disc pl-5 space-y-1">
                <li>Import at <strong>Privacy root directory</strong> as <strong>Maven project</strong></li>
                <li>Set JDK to <strong>OpenJDK 8</strong></li>
              </ul>
            </StepCard>
            <div className="rounded-lg bg-neutral-950/50 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Troubleshooting: Build Failures</h4>
              <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                <li>File → Invalidate Caches / Restart</li>
                <li><code className="text-xs bg-muted px-1 rounded">mvn clean install -DskipTests</code></li>
                <li>Maven Panel → Reimport All Maven Projects</li>
                <li>Maven Panel → Generate Sources And Update Folders</li>
                <li>Build → Rebuild Project</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-3">If still failing, add to <code className="text-xs bg-muted px-1 rounded">~/.m2/settings.xml</code>:</p>
              <CodeBlock language="xml">{`<mirror>
    <id>textiq</id>
    <name>TextIQ</name>
    <url>http://maven-aws.textiq.net:8080/repository/internal</url>
    <mirrorOf>*</mirrorOf>
</mirror>`}</CodeBlock>
            </div>
          </CollapsibleSection>

          <CollapsibleSection id="kubectl" icon="⎈" title="Step 9 — Kubectl Setup" accent="purple">
            <StepCard id="kubectl-install" checked={checked("kubectl-install")} onToggle={handleToggle} title="Install kubectl and authenticate">
              <CodeBlock language="bash">{`az login --tenant 8afe73f9-0d93-4821-a898-c5c2dc320953

az aks get-credentials --name esus-k8s-dev-1-a \\
  --resource-group esus-k8s-dev-1-a-aks \\
  --subscription 'pd - dev - k8s - dev - msdn'`}</CodeBlock>
            </StepCard>
          </CollapsibleSection>

          {/* ════════════════ WORKING WITH PLATFORM ════════════════ */}
          <div className="section-divider">
            <h2 className="text-lg font-bold tracking-tight text-muted-foreground uppercase text-xs">Working with the Platform</h2>
          </div>

          <CollapsibleSection id="run-app" icon="▶" title="Step 10 — Running the Application" accent="green">
            <StepCard id="app-workspace" checked={checked("app-workspace")} onToggle={handleToggle} title="Create a New Workspace">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Name:</strong> your choice</li>
                <li><strong>Matter:</strong> RelativityOne Billing</li>
                <li><strong>Template:</strong> team-appropriate</li>
                <li><strong>Project type:</strong> team-appropriate</li>
              </ul>
              <Img src="/media/image1.png" alt="Workspace creation" />
              <Img src="/media/image2.png" alt="Workspace form" />
            </StepCard>
            <StepCard id="app-import-export" checked={checked("app-import-export")} onToggle={handleToggle} title="Create an Import/Export Job">
              <p>Open the workspace, click <strong>New Import/Export Job</strong>, upload your test documents.</p>
              <Img src="/media/image3.png" alt="Import export" />
              <Img src="/media/image4.png" alt="Upload" />
            </StepCard>
            <StepCard id="app-saved-search" checked={checked("app-saved-search")} onToggle={handleToggle} title="Create a Saved Search">
              <p>Documents tab → magnifier icon → new search → select uploaded folder.</p>
              <Img src="/media/image5.png" alt="Saved search" />
              <Img src="/media/image6.png" alt="Select folder" />
            </StepCard>
            <StepCard id="app-data-analysis" checked={checked("app-data-analysis")} onToggle={handleToggle} title="Run Data Analysis">
              <p><strong>Data Breach Response</strong> tab → <strong>Jobs</strong> → Add Documents → once complete, run Data Analysis from the same tab.</p>
            </StepCard>
          </CollapsibleSection>

          <CollapsibleSection id="kubernetes" icon="⎈" title="Step 11 — Kubernetes & Mongo" accent="green">
            <InfoBox variant="warning">Mongo instances expire at <strong>6pm daily</strong> — must be restarted for dev.</InfoBox>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Find and extend your instance</h4>
              <CodeBlock language="bash">{`kubectl config get-contexts | grep t011

# Edit instance — change expiry date to future
kubectl --context=esus-k8s-reg-1-a \\
  --namespace=textiqprivacy \\
  edit instance esus019064-t011-w1050411b`}</CodeBlock>
              <Img src="/media/image7.png" alt="Edit instance" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4">Switch clusters</h4>
              <CodeBlock language="bash">{`kubectl config use-context esus-k8s-reg-1-a   # reg
kubectl config use-context esus-k8s-dev-1-a   # dev`}</CodeBlock>
            </div>
          </CollapsibleSection>

          <CollapsibleSection id="docker-push" icon="📦" title="Step 12 — Pushing Docker Images" accent="green">
            <p className="text-sm text-muted-foreground">Use <a href="https://github.com/relativityone/privateer" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-medium">privateer</a> to promote images. Then edit the deployment in the target cluster with the new image tag from <strong>Azure ACR → Services → Repositories</strong>.</p>
            <Img src="/media/image8.gif" alt="Docker push flow" />
          </CollapsibleSection>

          {/* ════════════════════════════════════════════════════════ */}
          {/*                    ARCHITECTURE                        */}
          {/* ════════════════════════════════════════════════════════ */}
          <div className="section-divider">
            <h2 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">PrivacyIQ Architecture</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Platform internals, detection pipeline, APIs, data stores, and debugging.</p>
          </div>

          {/* Platform Overview */}
          <CollapsibleSection id="arch-overview" icon="🏗" title="Platform Overview" accent="blue">
            <p className="text-sm text-muted-foreground leading-relaxed">
              PrivacyIQ is a <strong>PII detection platform</strong> that ingests documents, runs sensitive-information detection across multiple engines (regex, NER/ML, Python, Azure AI), and presents results in a searchable React UI for review and remediation. Each <strong>tenant</strong> runs in its own Kubernetes namespace with dedicated MongoDB, privacy-privacyiq, and supporting service pods.
            </p>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Projects</h4>
            <table className="arch-table">
              <thead><tr><th>Project</th><th>Language</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>privacy-privacyiq</code></td><td>Java</td><td>Core monolith — orchestrates detection pipeline, serves all API routes, builds reports, manages Liquibase DB migrations</td></tr>
                <tr><td><code>privacy-pidetectionmanager</code></td><td>Java</td><td>Micro-service tracking sub-document completion across all detectors</td></tr>
                <tr><td><code>privacy-excelprocessor</code></td><td>Java</td><td>Spreadsheet-specific detection — header identification, cell-level regex, link generation, tag stats</td></tr>
                <tr><td><code>privacy-docstatistics</code></td><td>Java</td><td>Calculates document-level statistics (PII counts, entity counts) after detection completes</td></tr>
                <tr><td><code>privacy-termcount</code></td><td>Java</td><td>Blocklist term counting service</td></tr>
                <tr><td><code>privacy-ui</code></td><td>React/JS</td><td>Frontend — document search table, filters, annotations, Excel QC, reports</td></tr>
                <tr><td><code>privacy-frontend</code></td><td>-</td><td>RelativityOne App wrapper (passes requests to core)</td></tr>
              </tbody>
            </table>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">The Privacy Stack</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Our services:</strong> Privacy (main web server + Java PII detectors) and Privacy UI (React frontend).<br />
              <strong>Dependencies:</strong> MongoDB (per tenant), Redis (queues + heartbeat), File Storage (ADLS / UNC).<br />
              In production, Mongo and Elasticsearch run as Docker images; Azure managed Redis is used. On a production Kubernetes environment, each tenant (<code className="text-xs bg-muted px-1 rounded">t011</code>, <code className="text-xs bg-muted px-1 rounded">t03</code>, etc.) has its own namespace with dedicated pods.
            </p>
          </CollapsibleSection>

          {/* Detection Pipeline */}
          <CollapsibleSection id="arch-pipeline" icon="⚙" title="Detection Pipeline" accent="blue">
            <p className="text-sm text-muted-foreground">Documents pass through ordered <strong>stages</strong>. Each stage is a <code className="text-xs bg-muted px-1 rounded">StageRunner</code> controlled by <code className="text-xs bg-muted px-1 rounded">PipelineDefinitions</code> and <code className="text-xs bg-muted px-1 rounded">PiiStageRunnerFlags</code> in MongoDB.</p>
            <CodeBlock>{` INGESTION                          DETECTION & POST-PROCESSING
 ─────────                          ───────────────────────────
 PATH_POPULATION                    JAVA_DETECTORS (regex)
       ↓                                  ↓
 DB_LOADER                          UNSTRUCTURED_DETECTORS (NER / ML)
       ↓                                  ↓
 DEDUPLICATION                      STRUCTURED_DETECTORS
       ↓                                  ↓
 SAMPLE_GENERATION                  EXCEL_HEADER_DETECTION
       ↓                                  ↓
 PDF_CONVERSION                     EXCEL_CONTENTS_DETECTION
       ↓                                  ↓
 EXTRACTION                         OVERLAP_REMOVAL
       ↓                                  ↓
 DOCUMENT_SPLITTING                 DOCUMENT_STATISTICS
       ↓                                  ↓
 VALIDATION                         REPORT_GENERATION
                                          ↓
                                    DOCUMENT_INDEXING`}</CodeBlock>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Key Classes</h4>
            <table className="arch-table">
              <thead><tr><th>Class</th><th>Location</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td><code>DetectionStage</code></td><td>privacy-privacyiq</td><td>Enum of every stage with <code>docStreamingRunOrder</code></td></tr>
                <tr><td><code>StageRunner</code></td><td>privacy-privacyiq</td><td>Abstract base — uses Redis heartbeat for coordination</td></tr>
                <tr><td><code>StageRunnerBuilder</code></td><td>privacy-privacyiq</td><td>Groups runners into INGESTION, RUN_DETECTORS, RUN_EXCEL_DETECTORS, etc.</td></tr>
                <tr><td><code>PipelineRunner</code></td><td>privacy-privacyiq</td><td>Orchestrates all stage runners in order</td></tr>
                <tr><td><code>StageRunnersService</code></td><td>privacy-privacyiq</td><td>Reads active/disabled stages from <code>PiiStageRunnerFlags</code></td></tr>
              </tbody>
            </table>
          </CollapsibleSection>

          {/* Data Flow */}
          <CollapsibleSection id="arch-flow" icon="🔄" title="End-to-End Data Flow" accent="blue">
            <CodeBlock>{`┌──────────────┐
│ File Upload   │  (via API / Cargo ingestion)
└──────┬───────┘
       ↓
┌──────────────────┐
│ PATH_POPULATION   │  Store file paths in document metadata
│ DB_LOADER         │  Create document record in MongoDB
│ DEDUPLICATION     │  Check for duplicates
└──────┬───────────┘
       ↓
┌──────────────────┐
│ PDF_CONVERSION    │  Convert native files to PDF
│ EXTRACTION        │  Read file from storage, extract text
│ DOCUMENT_SPLITTING│  Break into sub-documents
└──────┬───────────┘
       ↓
┌────────────────────────────────────────────┐
│ DETECTION (parallel across sub-documents)   │
│                                             │
│  Java Detectors ──→ queue ──→ PiDetectionMgr │
│  NER / ML       ──→ queue ──→ PiDetectionMgr │
│  Python Detect. ──→ queue ──→ PiDetectionMgr │
│  Azure AI       ──→ queue ──→ PiDetectionMgr │
│  Excel Processor (header + cell detection)    │
└──────────────┬─────────────────────────────┘
               ↓
┌──────────────────┐
│ PiDetectionMgr    │  Tracks sub-doc completion → signals "document complete"
└──────┬───────────┘
       ↓
┌──────────────────┐
│ OVERLAP_REMOVAL   │  Deduplicate overlapping detections
│ DOC_STATISTICS    │  Calculate PII & entity counts
│ REPORT_GEN        │  Build RealTimeReportRow for each document
└──────┬───────────┘
       ↓
┌──────────────────┐
│ MongoDB            │  Persisted in RealTimeReportRows collection
└──────┬───────────┘
       ↓
┌──────────────────┐
│ UI: Document       │  GET /privacyIQ/search/documents
│ Search Table       │
└──────────────────┘`}</CodeBlock>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Inter-Service Communication</h4>
            <p className="text-sm text-muted-foreground">Services communicate through <strong>message queues</strong> using a standard envelope:</p>
            <CodeBlock language="json">{`{
  "itemType": "localDetectionResult",
  "payload": { "docId": "...", "subDocId": "...", ... }
}`}</CodeBlock>
            <table className="arch-table mt-3">
              <thead><tr><th>Queue</th><th>Status</th><th>Producers</th></tr></thead>
              <tbody>
                <tr><td><code>pi_manager</code></td><td>Primary</td><td>LocalDetectionService, PiClassification, PythonDetectors</td></tr>
                <tr><td><code>pi_manager_queue</code></td><td>Legacy</td><td>Same producers (older deployments)</td></tr>
              </tbody>
            </table>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Message Types Consumed by PiDetectionManager</h4>
            <table className="arch-table">
              <thead><tr><th>itemType</th><th>Payload</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td><code>localDetectionResult</code></td><td>LocalDetectionResult</td><td>Java / regex detectors</td></tr>
                <tr><td><code>completedDocument</code></td><td>CompletedDocument</td><td>PiClassification</td></tr>
                <tr><td><code>pythonDetectorAnnotation</code></td><td>PiiAnnotation</td><td>Python detectors</td></tr>
                <tr><td><code>azure*</code></td><td>Various</td><td>Azure AI detectors</td></tr>
              </tbody>
            </table>
          </CollapsibleSection>

          {/* Backend API */}
          <CollapsibleSection id="arch-api" icon="🔌" title="Backend API" accent="purple">
            <p className="text-sm text-muted-foreground">All routes registered in <code className="text-xs bg-muted px-1 rounded">AbsPrivacyAppApis.java</code> via Spark Java:</p>
            <table className="arch-table mt-3">
              <thead><tr><th>Route Class</th><th>Endpoints</th></tr></thead>
              <tbody>
                <tr><td><code>PrivacyIQRealTimeReportRoutes</code></td><td><code>GET /privacyIQ/search/documents</code>, <code>POST /privacyIQ/search/generate</code>, <code>GET /privacyIQ/search/artifactIds</code></td></tr>
                <tr><td><code>PrivacyIQDocumentsRoutes</code></td><td><code>GET/PUT /privacyIQ/sampler/documents/:docId</code></td></tr>
                <tr><td><code>PrivacyIQAnnotationRoutes</code></td><td>Annotation CRUD, bulk annotation</td></tr>
                <tr><td><code>PrivacyIQPiiTypesRoutes</code></td><td>PII type definitions</td></tr>
                <tr><td><code>PrivacyIQDetectionPipelineRoutes</code></td><td>Start/stop detectors, progress, run history</td></tr>
                <tr><td><code>PrivacyIQBlacklistRoutes</code></td><td>Blocklist / allowlist management</td></tr>
                <tr><td><code>PrivacyIQPiiExcelTagsRoutes</code></td><td>Excel PII tags, header assignments</td></tr>
                <tr><td><code>PrivacyDataIngestionRoutes</code></td><td>Cargo (bulk document ingestion)</td></tr>
                <tr><td><code>MassEditRoutes</code></td><td>Bulk operations</td></tr>
                <tr><td><code>PrivacyIQConfigurationSettingRoutes</code></td><td>App settings</td></tr>
              </tbody>
            </table>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Primary Endpoint: Document Search</h4>
            <CodeBlock language="http">{`GET /privacyIQ/search/documents?limit=50&lastId=abc&sort=piiCount:desc&search=documentFlag:=EMPTY_TEXT`}</CodeBlock>
            <p className="text-sm text-muted-foreground mt-2">Returns <code className="text-xs bg-muted px-1 rounded">{`{ totalCount, lastId, documents: [...], fields: [...] }`}</code>. The <code className="text-xs bg-muted px-1 rounded">fields</code> array carries column definitions <strong>and</strong> dropdown filter options — UI renders dropdowns directly from <code className="text-xs bg-muted px-1 rounded">filterOptions</code>.</p>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Dropdown Data Sources</h4>
            <table className="arch-table">
              <thead><tr><th>Dropdown</th><th>Data Source</th></tr></thead>
              <tbody>
                <tr><td>Document Flags</td><td><code>PiiDocumentFlagService</code> → MongoDB <code>PiiDocumentFlags</code></td></tr>
                <tr><td>Document Categories</td><td><code>PiiTypesCache.getDocumentLevelTypes()</code> → MongoDB <code>PiiTypes</code></td></tr>
                <tr><td>PI Types</td><td><code>PiiTypesCache.getTokenLevelTypes()</code> → MongoDB <code>PiiTypes</code></td></tr>
                <tr><td>Data Analysis Status</td><td><code>DataAnalysisStatus</code> enum (hardcoded)</td></tr>
              </tbody>
            </table>
          </CollapsibleSection>

          {/* Frontend */}
          <CollapsibleSection id="arch-ui" icon="🎨" title="Frontend (React UI)" accent="purple">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Request Flow</h4>
            <CodeBlock>{`User clicks filter / sorts / paginates
  → TableControlsProvider updates tableControlsState
    → onFetch callback fires
      → Redux action: getDocSearchTableData(tableControlsState)
        → Saga calls searchAPI.getDocSearchTableData(tableControlsState)
          → apiCall({ url: '/privacyIQ/search/documents', params: {...} })
            → HTTP GET to backend
              → Response: { documents, fields, totalCount, lastId }
                → Saga dispatches updateDocSearchTable
                  → Redux store updated → Table re-renders`}</CodeBlock>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Key Files</h4>
            <table className="arch-table">
              <thead><tr><th>File</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>features/search/api/searchAPI.js</code></td><td>Calls <code>apiCall</code> with <code>/privacyIQ/search/documents</code></td></tr>
                <tr><td><code>api/module/utils.js</code></td><td><code>apiCall()</code> builds full URL: <code>getPrivacyEndpoint() + privacyAPI + url</code></td></tr>
                <tr><td><code>features/tables/utils/tableControlsUtils.js</code></td><td><code>generateStreamAPIParams()</code> converts UI state to query params</td></tr>
                <tr><td><code>features/search/utils/docSearchTableUtils.js</code></td><td>Column definitions, filter type mapping, dropdown rendering</td></tr>
                <tr><td><code>features/search/components/PiTypeDropdownFilter.js</code></td><td>Custom Material-UI dropdown for PI Types</td></tr>
              </tbody>
            </table>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">URL Construction</h4>
            <CodeBlock language="javascript">{`// Dev:  http://localhost:1339 + /privacyIQ/search/documents
// Prod: /privacymvp + /privacyIQ/search/documents
// RelOne: <from localStorage> + privacymvp + /privacyIQ/search/documents

const getPrivacyEndpoint = () =>
  process.env.AUTH_MODE === 'relone'
    ? localStorage(RELONE_PRIVACY_APP_URL_LS)
    : window.env?.PROD_URL_SUB_ROUTE`}</CodeBlock>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Query Parameter Format</h4>
            <CodeBlock>{`sort:    columnName:direction|columnName:direction
search:  columnName:operatorValue|columnName:operatorValue

Example: ?limit=50&sort=piiCount:desc&search=documentFlag:=EMPTY_TEXT|piiCount:>10`}</CodeBlock>
          </CollapsibleSection>

          {/* MongoDB */}
          <CollapsibleSection id="arch-mongo" icon="🗄" title="MongoDB Collections & Queries" accent="purple">
            <table className="arch-table">
              <thead><tr><th>Collection</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>RealTimeReportRows</code></td><td>Aggregated document data for UI search table (docId, piiCount, entityCount, flags, piTypes)</td></tr>
                <tr><td><code>PiiDocumentFlags</code></td><td>Flag definitions (id, readableName, flagType) — populates Document Flags dropdown</td></tr>
                <tr><td><code>PiiTypes</code></td><td>PII type definitions (e.g. &quot;Full Name&quot;, &quot;SSN&quot;) — populates PI Types dropdown</td></tr>
                <tr><td><code>PiiIgnoredLocalDetections</code></td><td>Detections intentionally skipped (below threshold, too short, overlapping)</td></tr>
                <tr><td><code>PipelineDefinitions</code></td><td>Which pipeline stages are active and their config</td></tr>
                <tr><td><code>PiiStageRunnerFlags</code></td><td>Enable/disable individual stage runners</td></tr>
                <tr><td><code>ConfigurationSettings</code></td><td>Application-level settings (feature flags, thresholds)</td></tr>
                <tr><td><code>PiiExcelRegexes</code></td><td>Regular expressions for Excel cell-level detection</td></tr>
                <tr><td><code>DATABASECHANGELOG</code></td><td>Liquibase tracking — records which changesets have been applied</td></tr>
              </tbody>
            </table>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Useful Queries</h4>
            <CodeBlock language="javascript">{`// All document flags
db.PiiDocumentFlags.find().pretty()

// Specific document in the report
db.RealTimeReportRows.findOne({ docId: "REL0000000003" })

// Ignored detections for a document
db.PiiIgnoredLocalDetections.find({ docId: "<docId>" }).pretty()

// All PII types
db.PiiTypes.find({}, { _id: 1, readableType: 1 }).pretty()

// Active pipeline stages
db.PipelineDefinitions.find().pretty()`}</CodeBlock>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Connecting to Tenant MongoDB</h4>
            <CodeBlock language="bash">{`# 1. Find the mongo pod
kubectl get pods -n <namespace> | grep mongo

# 2. Get credentials
kubectl exec -it <mongo-pod> -n <namespace> -- env | grep MONGO

# 3. Connect
kubectl exec -it <mongo-pod> -n <namespace> -- mongosh \\
  -u <user> -p <password> --authenticationDatabase admin`}</CodeBlock>
            <InfoBox variant="warning"><strong>UNC Path Gotcha:</strong> Documents store file paths as Windows UNC paths (<code className="text-xs bg-muted px-1 rounded">{`\\\\files.t011...\\file.TXT`}</code>). Linux containers cannot access them directly. If <code className="text-xs bg-muted px-1 rounded">textPath</code> is inaccessible, EXTRACTION returns empty text and no PII is detected.</InfoBox>
          </CollapsibleSection>

          {/* Document Flags */}
          <CollapsibleSection id="arch-flags" icon="🚩" title="Document Flags" accent="red">
            <p className="text-sm text-muted-foreground">Flags are metadata labels on documents indicating processing state or errors.</p>
            <table className="arch-table mt-3">
              <thead><tr><th>Type</th><th>Set By</th><th>Examples</th></tr></thead>
              <tbody>
                <tr><td><strong>USER</strong></td><td>Reviewer</td><td>Needs Further Review, Technical Issue, Illegible, Duplicate, Bulk Document</td></tr>
                <tr><td><strong>SYSTEM</strong></td><td>Platform</td><td>Exceeds Excel Size Limit, Unsupported Extension, Empty Text, PDF Conversion Failure</td></tr>
                <tr><td><strong>TIQ</strong></td><td>Detection pipeline</td><td>Timeout error, Linking Failure During Structured Detection, Conflicting Header PI Types</td></tr>
              </tbody>
            </table>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Flag Flow</h4>
            <CodeBlock>{`Detection stage encounters error
  → FlaggingServiceManager.applyDocumentFlag()
    → ServiceMessage sent to DOCUMENT_FLAG_SERVICE_MESSAGE_QUEUE
      → Flag stored on document (documentFlagsByUser)
        → RealTimeReportBuilder includes flags in report row
          → UI shows flag in Document Flags column / dropdown`}</CodeBlock>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Key Classes</h4>
            <table className="arch-table">
              <thead><tr><th>Class</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td><code>DocumentFlagDefaults</code></td><td>Hardcoded default flag list (privacy-privacyiq)</td></tr>
                <tr><td><code>ExcelProcessorFlags</code></td><td>Excel-specific flags (privacy-excelprocessor)</td></tr>
                <tr><td><code>PiiDocumentFlagService</code></td><td>CRUD against MongoDB <code>PiiDocumentFlags</code></td></tr>
                <tr><td><code>PiiDocumentFlagCache</code></td><td>In-memory cache for fast flag lookups</td></tr>
                <tr><td><code>FlaggingServiceManager</code></td><td>Sends add/remove flag messages to the flagging queue</td></tr>
              </tbody>
            </table>
          </CollapsibleSection>

          {/* Liquibase */}
          <CollapsibleSection id="arch-liquibase" icon="📜" title="Liquibase (Database Migrations)" accent="purple">
            <p className="text-sm text-muted-foreground">Applies database changes automatically on app start. Every tenant gets the same changes without manual queries.</p>
            <CodeBlock>{`App starts → reads changelog.xml → for each changeset:
  Is it in DATABASECHANGELOG? → YES: skip → NO: execute, then record`}</CodeBlock>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Directory Layout</h4>
            <CodeBlock>{`liquibase/
├── changelog.xml               ← Master list (includes all changesets)
├── REL-XXXXXXX/                ← One directory per Jira ticket
│   ├── changesets.xml          ← Entry point (includes data files)
│   └── data/
│       └── <changeset>.xml     ← Actual MongoDB commands`}</CodeBlock>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Creating a Changeset</h4>
            <p className="text-sm text-muted-foreground">1. Create directory, 2. Write data file, 3. Write entry point, 4. Register in master changelog:</p>
            <CodeBlock language="bash">{`mkdir -p liquibase/REL-XXXXXXX/data`}</CodeBlock>
            <CodeBlock language="xml">{`<!-- Insert example -->
<changeSet id="my-changeset-id" author="your.name">
    <mongo:insertOne collectionName="PiiDocumentFlags">
        <mongo:document>
            { _id: 'NEW_FLAG', readableName: 'Description', flagType: 'TIQ' }
        </mongo:document>
    </mongo:insertOne>
</changeSet>

<!-- Update example -->
<changeSet id="my-update-id" author="your.name">
    <mongo:runCommand>
        <mongo:command>
            { "update": "PiiDocumentFlags",
              "updates": [{ "q": {"_id": "FLAG_ID"},
                "u": { "$set": { "readableName": "New text" } }, "multi": false }] }
        </mongo:command>
    </mongo:runCommand>
</changeSet>`}</CodeBlock>
            <InfoBox variant="tip">Test manually on a test tenant first: <code className="text-xs bg-muted px-1 rounded">{`db.PiiDocumentFlags.updateOne({_id:"FLAG_ID"},{$set:{readableName:"New"}})`}</code> — then create the Liquibase changeset.</InfoBox>
          </CollapsibleSection>

          {/* Kubernetes Reference */}
          <CollapsibleSection id="arch-k8s" icon="⎈" title="Kubernetes (ComReg) Reference" accent="blue">
            <p className="text-sm text-muted-foreground">Each <strong>tenant</strong> (e.g. <code className="text-xs bg-muted px-1 rounded">t011</code>, <code className="text-xs bg-muted px-1 rounded">t03</code>) runs in its own namespace with its own MongoDB, privacy-privacyiq, and supporting service pods.</p>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Common Commands</h4>
            <CodeBlock language="bash">{`# List contexts
kubectl config get-contexts

# Switch context
kubectl config use-context <context>

# List pods in namespace
kubectl get pods -n <namespace>

# View logs
kubectl logs <pod> -n <namespace>

# Shell into a pod
kubectl exec -it <pod> -n <namespace> -- /bin/bash

# Port-forward (e.g. MongoDB)
kubectl port-forward <pod> 27017:27017 -n <namespace>`}</CodeBlock>
          </CollapsibleSection>

          {/* Debugging */}
          <CollapsibleSection id="arch-debug" icon="🐛" title="Debugging Cheat Sheet" accent="red">
            <table className="arch-table">
              <thead><tr><th>Symptom</th><th>Likely Cause</th><th>How to Check</th></tr></thead>
              <tbody>
                <tr><td>No PII detected</td><td>Empty extracted text (UNC path inaccessible)</td><td>Check <code>textPath</code> in document metadata; verify file exists in container storage</td></tr>
                <tr><td>No PII detected</td><td>Queue mismatch (<code>pi_manager</code> vs <code>pi_manager_queue</code>)</td><td>Check consumer queue config in <code>PrivacyPiDetectionManagerConfiguration</code></td></tr>
                <tr><td>No PII detected</td><td>Pipeline stage disabled</td><td><code>db.PiiStageRunnerFlags.find()</code></td></tr>
                <tr><td>Detections ignored</td><td>Below confidence threshold / overlap</td><td><code>{`db.PiiIgnoredLocalDetections.find({docId:"..."})`}</code></td></tr>
                <tr><td>Wrong flag text in UI</td><td>Stale <code>readableName</code> in MongoDB</td><td><code>{`db.PiiDocumentFlags.find({_id:"FLAG_ID"})`}</code></td></tr>
                <tr><td>0 documents in query</td><td>Wrong database / collection name</td><td>Use <code>RealTimeReportRows</code> not <code>PiiRealTimeDocuments</code></td></tr>
                <tr><td>MongoDB auth failed</td><td>Wrong credentials</td><td><code>{`kubectl exec -it <pod> -- env | grep MONGO`}</code></td></tr>
                <tr><td>Timeout flag on document</td><td>Detection took too long</td><td>Check <code>DETECTION_PROCESS_TIMEOUT_FAILURE</code> flag</td></tr>
              </tbody>
            </table>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 mb-2">Key File Reference</h4>
            <table className="arch-table">
              <thead><tr><th>File</th><th>Project</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>models/DetectionStage.java</code></td><td>privacyiq</td><td>Pipeline stage enum</td></tr>
                <tr><td><code>models/DocumentFlagDefaults.java</code></td><td>privacyiq</td><td>Default flag definitions</td></tr>
                <tr><td><code>realTimeDocument/RealTimeDocumentFieldService.java</code></td><td>privacyiq</td><td>UI field config + dropdown options</td></tr>
                <tr><td><code>api/AbsPrivacyAppApis.java</code></td><td>privacyiq</td><td>All route registrations</td></tr>
                <tr><td><code>service/PiiDocumentFlagService.java</code></td><td>privacyiq</td><td>CRUD for PiiDocumentFlags</td></tr>
                <tr><td><code>utils/FlaggingServiceManager.java</code></td><td>privacyiq</td><td>Flag add/remove via queue</td></tr>
                <tr><td><code>resources/liquibase/changelog.xml</code></td><td>privacyiq</td><td>Liquibase master changelog</td></tr>
                <tr><td><code>flags/ExcelProcessorFlags.java</code></td><td>excelprocessor</td><td>Excel-specific flags</td></tr>
                <tr><td><code>constants/PrivacyPiDetectionManagerConfiguration.java</code></td><td>pidetectionmgr</td><td>Queue config</td></tr>
                <tr><td><code>handler/PiDetectionManager*MessageHandler.java</code></td><td>pidetectionmgr</td><td>Message handlers per source</td></tr>
              </tbody>
            </table>
          </CollapsibleSection>

          {/* Footer */}
          <footer className="text-center text-xs text-muted-foreground pt-10 pb-8 border-t border-border/30 mt-10">
            <p>Privacy / TextIQ Engineering — New DEV Hire Onboarding Guide</p>
            <p className="mt-1 opacity-50">Built with Next.js + Tailwind + shadcn/ui</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
