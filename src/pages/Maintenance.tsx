import { useState } from "react";
import { Copy, Check, Download, Heart, Bot, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function generateBugTemplate(projectName: string) {
  return `---
name: Bug Report
about: Report a bug in ${projectName}
title: "[BUG] "
labels: bug
assignees: ''
---

## Describe the Bug
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g., macOS 14.0]
- Version: [e.g., 1.2.3]
- Node.js: [e.g., 20.x]

## Additional Context
Add any other context here.
`;
}

function generateFeatureTemplate(projectName: string) {
  return `---
name: Feature Request
about: Suggest an idea for ${projectName}
title: "[FEATURE] "
labels: enhancement
assignees: ''
---

## Problem Statement
A clear description of the problem this feature would solve.

## Proposed Solution
Describe the solution you'd like.

## Alternatives Considered
Any alternative solutions or features you've considered.

## Additional Context
Add any other context, mockups, or examples here.
`;
}

const botGuides = [
  {
    name: "Stale Bot",
    description: "Automatically closes inactive issues and PRs after a set period.",
    config: `# .github/stale.yml
daysUntilStale: 60
daysUntilClose: 7
staleLabel: stale
markComment: >
  This issue has been automatically marked as stale because
  it has not had recent activity. It will be closed in 7 days
  if no further activity occurs.
closeComment: >
  This issue has been automatically closed due to inactivity.
  Please reopen if this is still relevant.
exemptLabels:
  - pinned
  - security
  - "good first issue"`,
  },
  {
    name: "Auto-Labeler",
    description: "Automatically labels PRs based on file paths changed.",
    config: `# .github/labeler.yml
documentation:
  - changed-files:
    - any-glob-to-any-file: 'docs/**'
    - any-glob-to-any-file: '*.md'

tests:
  - changed-files:
    - any-glob-to-any-file: 'tests/**'
    - any-glob-to-any-file: '**/*.test.*'

frontend:
  - changed-files:
    - any-glob-to-any-file: 'src/components/**'

ci:
  - changed-files:
    - any-glob-to-any-file: '.github/**'`,
  },
  {
    name: "Welcome Bot",
    description: "Greets first-time contributors with a friendly message.",
    config: `# .github/config.yml
newIssueWelcomeComment: >
  Thanks for opening your first issue! 🎉
  We'll review it as soon as possible.
  In the meantime, please check our
  [FAQ](./docs/FAQ.md) for common questions.

newPRWelcomeComment: >
  Welcome and thanks for your first PR! 🚀
  A maintainer will review it shortly.
  Please make sure you've read our
  [Contributing Guide](CONTRIBUTING.md).

firstPRMergeComment: >
  Congrats on getting your first PR merged! 🎊
  You're now an official contributor.`,
  },
];

const healthTips = [
  {
    title: "Set Response Time Expectations",
    content: "Add a note to your README: 'I maintain this in my free time. Issues may take 1-2 weeks to get a response.' This reduces guilt and sets healthy boundaries.",
  },
  {
    title: "Define 'Office Hours'",
    content: "Pick specific days/times for OSS work. Outside those hours, notifications are off. Your contributors will adapt.",
  },
  {
    title: "Learn to Say No",
    content: "Not every feature request deserves implementation. 'This is out of scope for this project' is a complete answer.",
  },
  {
    title: "Delegate and Trust",
    content: "Give commit access to trusted contributors early. A bus factor of 1 is a project risk, not a badge of honor.",
  },
  {
    title: "Take Breaks Without Guilt",
    content: "Add a MAINTENANCE.md noting expected response times. If you need a month off, say so. The project will survive.",
  },
];

export default function Maintenance() {
  const [projectName, setProjectName] = useState("my-project");
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-mono text-2xl font-bold">Maintenance & Automation</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tools for sustainable project maintenance — templates, bots, and self-care.
        </p>
      </div>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates"><FileText className="mr-1 h-3 w-3" />Issue Templates</TabsTrigger>
          <TabsTrigger value="bots"><Bot className="mr-1 h-3 w-3" />Automation Bots</TabsTrigger>
          <TabsTrigger value="health"><Heart className="mr-1 h-3 w-3" />Maintainer Health</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6 space-y-4">
          <div className="max-w-xs space-y-1.5">
            <Label className="text-xs">Project Name</Label>
            <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} className="font-mono text-sm" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Bug Report", content: generateBugTemplate(projectName), id: "bug" },
              { label: "Feature Request", content: generateFeatureTemplate(projectName), id: "feat" },
            ].map((t) => (
              <Card key={t.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{t.label}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => copyText(t.content, t.id)}>
                      {copied === t.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-64 overflow-auto rounded bg-muted/50 p-3 font-mono text-[11px] text-muted-foreground">
                    {t.content}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bots" className="mt-6 space-y-4">
          {botGuides.map((bot) => (
            <Card key={bot.name}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">{bot.name}</CardTitle>
                    <CardDescription className="text-xs">{bot.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyText(bot.config, bot.name)}>
                    {copied === bot.name ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="max-h-48 overflow-auto rounded bg-muted/50 p-3 font-mono text-[11px] text-muted-foreground">
                  {bot.config}
                </pre>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {healthTips.map((tip) => (
              <Card key={tip.title} className="transition-colors hover:border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Heart className="h-3.5 w-3.5 text-primary" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
