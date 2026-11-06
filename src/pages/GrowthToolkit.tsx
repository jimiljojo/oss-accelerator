import { useState } from "react";
import { Copy, Check, Heart, Users, GitPullRequest, ShieldAlert, Crown, Brain, HandHeart, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

// --- First Contributors Guide ---

const contributorSteps = [
  {
    title: "Write Irresistible 'Good First Issues'",
    icon: Users,
    tips: [
      "Be specific — include file paths, function names, and expected behavior",
      "Estimate time: 'This should take ~30 minutes for someone familiar with React'",
      "Add context: 'We want this because [reason]' — motivation matters",
      "Link to relevant docs and code — reduce the scavenger hunt",
      "Tag with difficulty level: 'beginner', 'intermediate', 'advanced'",
    ],
    template: `## Good First Issue: [Clear title]

**Context:** [Why this matters to the project]

**What needs to happen:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Files to look at:**
- \`src/components/Widget.tsx\` — the main component
- \`src/utils/helpers.ts\` — utility functions

**Expected outcome:** [What success looks like]

**Estimated time:** ~30-60 minutes
**Difficulty:** Beginner
**Mentor:** @[your-username] (feel free to ask questions!)`,
  },
  {
    title: "Make Your README Contributor-Friendly",
    icon: GitPullRequest,
    tips: [
      "Add a 'Contributing' section with a direct link to CONTRIBUTING.md",
      "Include a 'Development Setup' section — clone, install, run in 3 steps max",
      "Show the project architecture briefly — where does what live?",
      "Add a 'Need Help?' section with links to discussions or Discord",
      "Display a 'Contributors' section — people love seeing their avatar",
    ],
  },
  {
    title: "Create a Welcoming CONTRIBUTING.md",
    icon: HandHeart,
    tips: [
      "Start with 'Thank you for considering contributing!' — warmth matters",
      "List types of contributions you welcome (code, docs, tests, design)",
      "Explain the PR process step-by-step for total beginners",
      "Set response time expectations: 'PRs are usually reviewed within 3 days'",
      "Include coding style guidelines and how to run tests",
    ],
  },
];

// --- Handling First PR ---

const prGuide = [
  {
    title: "When a PR arrives",
    steps: [
      "Respond within 24–48 hours, even if just to say 'Thanks, I'll review this soon!'",
      "Check if it addresses an existing issue — if not, ask for context",
      "Run the code locally before providing feedback",
      "Be kind in reviews — remember this might be their first OSS contribution ever",
    ],
  },
  {
    title: "Giving good feedback",
    steps: [
      "Lead with what's good: 'Nice approach to X!'",
      "Use suggestions, not demands: 'What if we tried...' vs 'Change this to...'",
      "Explain the 'why' behind every requested change",
      "Offer to pair or help if the changes are complex",
      "If you're going to rewrite their code, ask first — it can feel dismissive",
    ],
  },
  {
    title: "Merging & celebrating",
    steps: [
      "Squash-merge with a descriptive commit message crediting the contributor",
      "Thank them publicly in the PR and on social media",
      "Add them to a CONTRIBUTORS file or use the All Contributors bot",
      "Label the PR with 'first-contribution' for their portfolio",
      "Ask if they'd like to be tagged for future similar issues",
    ],
  },
];

// --- Managing Issues Without Burnout ---

const issueManagement = [
  {
    title: "Triage System",
    description: "Create a simple label system to stay organized without overwhelm",
    labels: ["priority:critical", "priority:high", "priority:low", "status:needs-info", "status:confirmed", "status:wontfix", "type:bug", "type:feature", "type:docs"],
  },
  {
    title: "Response Templates",
    description: "Save time with templated responses for common situations",
    templates: [
      {
        name: "Needs More Info",
        text: "Thanks for reporting this! Could you provide:\n- Steps to reproduce\n- Your environment (OS, Node version, etc.)\n- Expected vs actual behavior\n\nThis will help us track down the issue faster. 🙏",
      },
      {
        name: "Won't Fix",
        text: "Thanks for the suggestion! After consideration, this falls outside the project's current scope. We want to keep the project focused on [core purpose]. Feel free to fork if you'd like to explore this direction!",
      },
      {
        name: "Duplicate",
        text: "This is a duplicate of #[issue-number]. I'm closing this to keep the discussion in one place. Please add your input to the original issue!",
      },
    ],
  },
];

// --- When to Say No ---

const sayingNo = [
  {
    scenario: "Feature requests that don't fit the vision",
    response: "Thank you for the idea! This doesn't align with our current project direction, but I appreciate you thinking about it. Feel free to fork the project if you'd like to explore this.",
    principle: "Your project doesn't have to be everything to everyone.",
  },
  {
    scenario: "Demands for immediate fixes",
    response: "I understand this is important to you. This is a volunteer-maintained project and I'll get to it when I can. If it's urgent for your use case, PRs are welcome!",
    principle: "You don't owe anyone your free time.",
  },
  {
    scenario: "Scope creep PRs",
    response: "This PR introduces changes beyond what was discussed in the issue. Could we break this into smaller, focused PRs? It'll be easier to review and less risky to merge.",
    principle: "Smaller PRs are always better.",
  },
  {
    scenario: "Aggressive or entitled behavior",
    response: "Please review our Code of Conduct. We're happy to discuss technical disagreements respectfully, but this tone isn't acceptable in our community.",
    principle: "Enforce your Code of Conduct consistently.",
  },
];

// --- Governance Templates ---

const governanceModels = [
  {
    name: "Benevolent Dictator (BDFL)",
    description: "One person (usually the creator) makes final decisions. Simple and effective for small projects.",
    bestFor: "Solo projects, early-stage projects, projects with a clear vision",
    template: `# Governance

## Decision Making
[Your Name] is the project lead and has final decision-making authority.

## How Decisions Are Made
1. Issues and PRs are discussed openly
2. Community input is valued and considered
3. Final decisions rest with the project lead

## Becoming a Maintainer
Active contributors may be invited to become maintainers after demonstrating:
- Consistent, quality contributions over 3+ months
- Alignment with project values and direction
- Good communication with other contributors`,
  },
  {
    name: "Consensus-Based",
    description: "Decisions are made by agreement among maintainers. More democratic but slower.",
    bestFor: "Multi-maintainer projects, community-driven projects",
    template: `# Governance

## Decision Making
Decisions are made by consensus among active maintainers.

## Process
1. Proposals are submitted as GitHub Discussions
2. A 7-day comment period follows
3. If no objections, the proposal is accepted
4. If objections exist, maintainers discuss and vote
5. Simple majority wins; ties go to the original proposer

## Maintainer Criteria
- 6+ months of active contribution
- Nominated by an existing maintainer
- Approved by majority of current maintainers`,
  },
  {
    name: "Technical Steering Committee",
    description: "A small elected group makes decisions. Best for large, complex projects.",
    bestFor: "Large projects, corporate-backed projects, projects with many stakeholders",
    template: `# Governance

## Technical Steering Committee (TSC)
The TSC consists of 3-5 elected members who serve 1-year terms.

## TSC Responsibilities
- Set technical direction
- Resolve disputes
- Approve major changes
- Manage releases

## Elections
- Held annually
- All contributors with 10+ merged PRs can vote
- Self-nomination with a brief platform statement`,
  },
];

// --- Mental Health ---

const mentalHealthGuide = [
  {
    title: "Set Boundaries From Day One",
    icon: ShieldAlert,
    content: "Add response time expectations to your README. Something like: 'I maintain this in my free time. Issues may take 1–2 weeks for a response.' This eliminates guilt before it starts.",
    actionable: "Add a MAINTENANCE.md file with your availability schedule.",
  },
  {
    title: "Define 'Office Hours'",
    icon: Crown,
    content: "Pick 2–3 specific times per week for OSS work. Outside those hours, mute notifications. Your contributors will adapt — and you'll be more productive during focused time.",
    actionable: "Set notification schedules on GitHub and your phone.",
  },
  {
    title: "It's OK to Step Away",
    icon: Heart,
    content: "You don't owe anyone your weekends. If you need a break, post a message: 'Taking a break for [X weeks]. PRs will be reviewed when I return.' The project will survive.",
    actionable: "Draft a 'maintenance pause' announcement template now, so it's ready when you need it.",
  },
  {
    title: "Delegate Early",
    icon: Users,
    content: "A bus factor of 1 is a project risk, not a badge of honor. Give commit access to trusted contributors. Write a runbook so others can do releases. You're building a community, not a personal monument.",
    actionable: "Identify 1–2 contributors who could become maintainers.",
  },
  {
    title: "Recognize When It's Not Fun",
    icon: Brain,
    content: "If maintaining feels like a chore more than a joy, something needs to change. Options: find co-maintainers, reduce scope, archive the project, or hand it off. All of these are valid and healthy choices.",
    actionable: "Check in with yourself monthly: 'Is this still energizing me?'",
  },
  {
    title: "You Can Say No",
    icon: XCircle,
    content: "'This is out of scope' and 'I don't have bandwidth for this' are complete sentences. You don't need to justify every decision. Protect your energy for the work that matters most.",
    actionable: "Practice saying no to one low-priority request this week.",
  },
];

// --- Component ---

export default function GrowthToolkit() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-mono text-2xl font-bold">Open Source Growth Toolkit</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Grow your project sustainably — attract contributors, handle PRs gracefully, and protect your mental health.
        </p>
      </div>

      <Tabs defaultValue="contributors">
        <TabsList className="flex-wrap">
          <TabsTrigger value="contributors"><Users className="mr-1 h-3 w-3" />Get Contributors</TabsTrigger>
          <TabsTrigger value="prs"><GitPullRequest className="mr-1 h-3 w-3" />Handle PRs</TabsTrigger>
          <TabsTrigger value="issues"><ShieldAlert className="mr-1 h-3 w-3" />Manage Issues</TabsTrigger>
          <TabsTrigger value="sayno"><XCircle className="mr-1 h-3 w-3" />Saying No</TabsTrigger>
          <TabsTrigger value="governance"><Crown className="mr-1 h-3 w-3" />Governance</TabsTrigger>
          <TabsTrigger value="health"><Heart className="mr-1 h-3 w-3" />Mental Health</TabsTrigger>
        </TabsList>

        {/* Get Contributors */}
        <TabsContent value="contributors" className="mt-6 space-y-6">
          {contributorSteps.map((step) => (
            <Card key={step.title}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <step.icon className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2">
                  {step.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      {tip}
                    </li>
                  ))}
                </ul>
                {step.template && (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2"
                      onClick={() => copyText(step.template!, step.title)}
                    >
                      {copiedId === step.title ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                    <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded bg-muted/50 p-3 font-mono text-[11px] text-muted-foreground">
                      {step.template}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Handle PRs */}
        <TabsContent value="prs" className="mt-6 space-y-4">
          {prGuide.map((phase) => (
            <Card key={phase.title}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GitPullRequest className="h-4 w-4 text-primary" />
                  {phase.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {phase.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Manage Issues */}
        <TabsContent value="issues" className="mt-6 space-y-4">
          {issueManagement.map((section) => (
            <Card key={section.title}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{section.title}</CardTitle>
                <CardDescription className="text-xs">{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {"labels" in section && (
                  <div className="flex flex-wrap gap-1.5">
                    {section.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="font-mono text-[10px]">{label}</Badge>
                    ))}
                  </div>
                )}
                {"templates" in section && (
                  <div className="space-y-3">
                    {section.templates.map((tmpl) => (
                      <div key={tmpl.name} className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-medium">{tmpl.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => copyText(tmpl.text, tmpl.name)}>
                            {copiedId === tmpl.name ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                        <pre className="whitespace-pre-wrap rounded bg-muted/50 p-3 font-mono text-[11px] text-muted-foreground">
                          {tmpl.text}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Saying No */}
        <TabsContent value="sayno" className="mt-6 space-y-4">
          <p className="text-xs text-muted-foreground">
            Saying no is a skill. Here are common scenarios and how to handle them gracefully.
          </p>
          {sayingNo.map((item) => (
            <Card key={item.scenario} className="transition-colors hover:border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{item.scenario}</CardTitle>
                <CardDescription className="font-mono text-[11px] text-primary">
                  {item.principle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0"
                    onClick={() => copyText(item.response, item.scenario)}
                  >
                    {copiedId === item.scenario ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                  <p className="pr-8 text-xs text-muted-foreground italic leading-relaxed">"{item.response}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Governance */}
        <TabsContent value="governance" className="mt-6 space-y-4">
          {governanceModels.map((model) => (
            <Card key={model.name}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{model.name}</CardTitle>
                    <CardDescription className="text-xs">{model.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyText(model.template, model.name)}>
                    {copiedId === model.name ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
                    <span className="text-xs">{copiedId === model.name ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <div className="mt-1">
                  <span className="font-mono text-[10px] text-primary">Best for: </span>
                  <span className="text-[11px] text-muted-foreground">{model.bestFor}</span>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded bg-muted/50 p-3 font-mono text-[11px] text-muted-foreground">
                  {model.template}
                </pre>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Mental Health */}
        <TabsContent value="health" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {mentalHealthGuide.map((tip) => (
              <Card key={tip.title} className="transition-colors hover:border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <tip.icon className="h-3.5 w-3.5 text-primary" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.content}</p>
                  <p className="rounded bg-primary/5 px-2 py-1.5 font-mono text-[11px] text-primary">
                    → {tip.actionable}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
