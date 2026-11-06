import { useState, useEffect } from "react";
import { Check, Circle, Rocket, MessageSquare, Zap, Image, Clock, Calendar, Copy, Megaphone, Share2, Users, Twitter, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

// --- Checklist Data ---

interface ChecklistItem {
  id: string;
  label: string;
  tip?: string;
}

interface ChecklistSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  items: ChecklistItem[];
}

const prelaunchItems: ChecklistItem[] = [
  { id: "pre-1", label: "README is polished with clear description, install steps, and screenshots" },
  { id: "pre-2", label: "CONTRIBUTING.md and CODE_OF_CONDUCT.md are in place" },
  { id: "pre-3", label: "LICENSE file added to the repository root" },
  { id: "pre-4", label: "CI/CD pipeline is green — tests pass, linting clean" },
  { id: "pre-5", label: "5+ 'good first issues' labeled and well-described" },
  { id: "pre-6", label: "Social preview image (1280×640) set in repo settings" },
  { id: "pre-7", label: "Demo or landing page is live and accessible" },
  { id: "pre-8", label: "Changelog or release notes prepared for v0.1 / v1.0" },
];

const launchDayItems: ChecklistItem[] = [
  { id: "ld-1", label: "Post Show HN between 8–10 AM EST" },
  { id: "ld-2", label: "Publish Twitter/X launch thread" },
  { id: "ld-3", label: "Post to 2–3 relevant subreddits" },
  { id: "ld-4", label: "Share in relevant Discord/Slack communities" },
  { id: "ld-5", label: "Send Product Hunt launch (if scheduled)" },
  { id: "ld-6", label: "Reply to every comment within first 2 hours" },
  { id: "ld-7", label: "Monitor for issues — first impression matters" },
  { id: "ld-8", label: "Thank early stargazers and contributors publicly" },
];

const sections: ChecklistSection[] = [
  {
    id: "prelaunch", title: "Pre-Launch Checklist", icon: Clock, description: "Everything to do before you hit publish",
    items: prelaunchItems,
  },
  {
    id: "launchday", title: "Launch Day Checklist", icon: Rocket, description: "Your launch day game plan",
    items: launchDayItems,
  },
  {
    id: "hn", title: "Hacker News (Show HN)", icon: Rocket, description: "Get your project on the front page",
    items: [
      { id: "hn-1", label: "Write a concise title — 'Show HN: [Name] – [One-line pitch]'" },
      { id: "hn-2", label: "Prepare a top-level comment explaining motivation and tech stack" },
      { id: "hn-3", label: "Post between 8–10 AM EST on weekdays", tip: "Tuesdays and Wednesdays tend to perform best" },
      { id: "hn-4", label: "Have a live demo ready — HN readers click fast" },
      { id: "hn-5", label: "Be ready to respond to comments within minutes" },
      { id: "hn-6", label: "Don't ask friends to upvote — HN detects vote rings" },
    ],
  },
  {
    id: "reddit", title: "Reddit Strategy", icon: MessageSquare, description: "Build momentum on subreddits",
    items: [
      { id: "rd-1", label: "Identify 3–5 relevant subreddits (r/opensource, r/webdev, etc.)" },
      { id: "rd-2", label: "Build karma first — contribute before posting" },
      { id: "rd-3", label: "Write problem → solution → demo post structure" },
      { id: "rd-4", label: "Include a GIF or screenshot — 3x more engagement" },
      { id: "rd-5", label: "Respond to every comment transparently" },
    ],
  },
  {
    id: "ph", title: "Product Hunt", icon: Zap, description: "Launch to the PH community",
    items: [
      { id: "ph-1", label: "Get a hunter with 1,000+ followers" },
      { id: "ph-2", label: "Prepare 5 screenshots and a 1-min demo video" },
      { id: "ph-3", label: "Write a tagline under 60 characters" },
      { id: "ph-4", label: "Schedule for 12:01 AM PT on Tue/Wed/Thu" },
      { id: "ph-5", label: "Prepare a 'Maker Comment' with the backstory" },
    ],
  },
  {
    id: "assets", title: "Assets & Branding", icon: Image, description: "Visual polish for your launch",
    items: [
      { id: "a-1", label: "Create a simple logo (text-based is fine for v1)" },
      { id: "a-2", label: "Take clean screenshots of main features" },
      { id: "a-3", label: "Record a 30–60 second demo GIF or video" },
      { id: "a-4", label: "Add social preview image to repo settings" },
      { id: "a-5", label: "Write a compelling one-liner for social sharing" },
    ],
  },
];

// --- Announcement Templates ---

const templates = [
  {
    id: "twitter",
    title: "Twitter/X Launch Thread",
    icon: Twitter,
    content: `🚀 Introducing [Project Name] — [one-line pitch]

After [X months] of building, I'm excited to open source [Project Name].

What it does:
• [Key feature 1]
• [Key feature 2]  
• [Key feature 3]

Built with: [tech stack]

⭐ GitHub: [link]
📖 Docs: [link]

Here's the story behind it 🧵👇

---

1/ The problem: [describe pain point you experienced]

2/ Existing solutions didn't work because [reasons]

3/ So I built [Project Name] which [key differentiator]

4/ It's fully open source under [license]. Contributions welcome!

Looking for help with:
- [ ] Feature X
- [ ] Documentation
- [ ] Testing on [platform]

Drop a ⭐ if this is useful! 🙏`,
  },
  {
    id: "hn",
    title: "Hacker News Post",
    icon: Rocket,
    content: `Title: Show HN: [Project Name] – [One-line description]

URL: [GitHub or landing page URL]

---

Top-level comment:

Hi HN! I built [Project Name] because [problem/motivation].

Existing solutions like [X] and [Y] didn't quite fit because [reasons].

[Project Name] is different because [key differentiator].

Tech stack: [languages/frameworks used]
License: [MIT/Apache/etc.]

Some interesting technical decisions:
- [Decision 1 and why]
- [Decision 2 and why]

I'd love feedback on [specific area]. Happy to answer questions!`,
  },
  {
    id: "reddit",
    title: "Reddit Post",
    icon: MessageSquare,
    content: `Title: I built [Project Name] — [what it does] [Open Source]

---

Hey [subreddit]! 👋

**The problem:** [Describe the pain point]

**What I built:** [Project Name] is a [type of tool] that [key value prop]. It's completely open source under [license].

**Key features:**
- ✅ [Feature 1]
- ✅ [Feature 2]
- ✅ [Feature 3]

**Tech stack:** [languages, frameworks]

**Links:**
- 🔗 GitHub: [link]
- 📖 Docs: [link]  
- 🎥 Demo: [link]

**Looking for contributors!** I've labeled several issues as "good first issue" if you'd like to help.

Happy to answer any questions! Feedback welcome 🙏`,
  },
  {
    id: "devto",
    title: "Dev.to / Blog Post Outline",
    icon: Globe,
    content: `Title: I Built [Project Name] and Open Sourced It — Here's What I Learned

---

## The Problem
[2-3 paragraphs about the pain point]

## Why Existing Solutions Didn't Work
[Brief comparison with alternatives]

## Introducing [Project Name]
[What it does, key features, screenshots]

## Technical Deep Dive
[Architecture decisions, interesting challenges]

## Getting Started
\`\`\`bash
npm install [project-name]
# or
git clone [repo-url]
\`\`\`

## What's Next
[Roadmap, planned features]

## How to Contribute
[Link to CONTRIBUTING.md, good first issues]

## Lessons Learned
[3-5 takeaways from the process]

---
⭐ Star on GitHub: [link]
🐦 Follow for updates: [twitter]`,
  },
];

// --- Distribution Channels ---

interface ChannelGroup {
  stack: string;
  channels: string[];
}

const distributionChannels: ChannelGroup[] = [
  { stack: "JavaScript / TypeScript", channels: ["r/javascript", "r/typescript", "r/node", "r/reactjs", "Echo JS", "JavaScript Weekly", "Node Weekly", "Best of JS"] },
  { stack: "Python", channels: ["r/Python", "r/learnpython", "Python Weekly", "PyCoder's Weekly", "Awesome Python list", "Real Python community"] },
  { stack: "Rust", channels: ["r/rust", "This Week in Rust", "Rust users forum", "Awesome Rust list", "Rust Discord"] },
  { stack: "Go", channels: ["r/golang", "Golang Weekly", "Go Forum", "Awesome Go list", "Gophers Slack"] },
  { stack: "DevOps / CLI", channels: ["r/devops", "r/selfhosted", "r/commandline", "DevOps Weekly", "Changelog podcast/newsletter"] },
  { stack: "General", channels: ["Hacker News", "Product Hunt", "r/opensource", "r/programming", "Dev.to", "Hashnode", "Lobsters", "TLDR newsletter"] },
];

// --- Timeline ---

interface TimelinePhase {
  label: string;
  when: string;
  tasks: string[];
}

const timeline: TimelinePhase[] = [
  {
    label: "4 weeks before",
    when: "T-28",
    tasks: ["Finalize README and docs", "Set up CI/CD", "Create good first issues", "Start building presence in communities"],
  },
  {
    label: "2 weeks before",
    when: "T-14",
    tasks: ["Record demo video/GIF", "Create social preview image", "Write announcement templates", "Line up a Product Hunt hunter"],
  },
  {
    label: "1 week before",
    when: "T-7",
    tasks: ["Polish landing page", "Draft all social posts", "Test installation from scratch", "Prepare FAQ for common questions"],
  },
  {
    label: "Launch day",
    when: "T-0",
    tasks: ["Post on HN at 8–10 AM EST", "Publish Twitter thread", "Post on Reddit", "Share in Discords/Slacks", "Monitor and respond to everything"],
  },
  {
    label: "Week after",
    when: "T+7",
    tasks: ["Follow up on community threads", "Merge first contributor PRs", "Write a retrospective blog post", "Submit to newsletters and curated lists"],
  },
];

// --- Storage ---

const STORAGE_KEY = "oss-accelerator-checklist";

export default function LaunchChecklist() {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
  }, [checked]);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const copyTemplate = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
  const completedItems = sections.reduce(
    (sum, s) => sum + s.items.filter((i) => checked.has(i.id)).length,
    0
  );
  const pct = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-mono text-2xl font-bold">Launch Strategy Planner</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A complete launch roadmap — checklists, announcement templates, distribution channels, and timeline.
        </p>
      </div>

      {/* Progress bar */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-bold text-primary">{pct}%</span>
              <span className="text-sm text-muted-foreground">
                {completedItems} of {totalItems} tasks complete
              </span>
            </div>
            <div className="h-2 w-48 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="checklists">
        <TabsList className="flex-wrap">
          <TabsTrigger value="checklists"><Check className="mr-1 h-3 w-3" />Checklists</TabsTrigger>
          <TabsTrigger value="timeline"><Calendar className="mr-1 h-3 w-3" />Timeline</TabsTrigger>
          <TabsTrigger value="templates"><Megaphone className="mr-1 h-3 w-3" />Templates</TabsTrigger>
          <TabsTrigger value="channels"><Share2 className="mr-1 h-3 w-3" />Channels</TabsTrigger>
        </TabsList>

        {/* Checklists Tab */}
        <TabsContent value="checklists" className="mt-6 space-y-6">
          {sections.map((section) => {
            const sectionDone = section.items.filter((i) => checked.has(i.id)).length;
            return (
              <Card key={section.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base">{section.title}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {sectionDone}/{section.items.length}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className="flex w-full items-start gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted/50"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {checked.has(item.id) ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <span className={`text-sm ${checked.has(item.id) ? "text-muted-foreground line-through" : ""}`}>
                            {item.label}
                          </span>
                          {item.tip && (
                            <p className="mt-0.5 text-xs text-muted-foreground">{item.tip}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="mt-6">
          <div className="relative space-y-0">
            {timeline.map((phase, i) => (
              <div key={phase.when} className="relative flex gap-4 pb-8">
                {/* Vertical line */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[15px] top-8 h-full w-px bg-border" />
                )}
                {/* Dot */}
                <div className="relative z-10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border bg-card">
                  <span className="font-mono text-[10px] font-bold text-primary">{phase.when}</span>
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-mono text-sm font-bold">{phase.label}</h3>
                  <ul className="mt-2 space-y-1">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Circle className="mt-0.5 h-3 w-3 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-6 space-y-4">
          {templates.map((tmpl) => (
            <Card key={tmpl.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <tmpl.icon className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">{tmpl.title}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyTemplate(tmpl.content, tmpl.id)}
                  >
                    {copiedId === tmpl.id ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
                    <span className="text-xs">{copiedId === tmpl.id ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded bg-muted/50 p-3 font-mono text-[11px] text-muted-foreground">
                  {tmpl.content}
                </pre>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Distribution Channels Tab */}
        <TabsContent value="channels" className="mt-6 space-y-4">
          <p className="text-xs text-muted-foreground">
            Distribution channels tailored to your tech stack. Share your project where your audience already hangs out.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {distributionChannels.map((group) => (
              <Card key={group.stack} className="transition-colors hover:border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-sm">{group.stack}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {group.channels.map((ch) => (
                      <Badge key={ch} variant="secondary" className="font-mono text-[10px]">
                        {ch}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
