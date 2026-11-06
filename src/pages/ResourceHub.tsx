import { ExternalLink, BookOpen, Github, Shield, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Resource {
  title: string;
  description: string;
  url: string;
  category: string;
  icon: React.ElementType;
}

const resources: Resource[] = [
  {
    title: "Open Source Guides",
    description: "GitHub's comprehensive guides on starting and growing an open source project.",
    url: "https://opensource.guide",
    category: "Getting Started",
    icon: BookOpen,
  },
  {
    title: "Choose a License",
    description: "Simple guide to help you pick the right license for your project.",
    url: "https://choosealicense.com",
    category: "Licensing",
    icon: Shield,
  },
  {
    title: "First Timers Only",
    description: "A collection of resources to help you make your project welcoming to first-time contributors.",
    url: "https://www.firsttimersonly.com",
    category: "Community",
    icon: Users,
  },
  {
    title: "Awesome README",
    description: "Curated list of awesome READMEs for inspiration on documenting your project.",
    url: "https://github.com/matiassingers/awesome-readme",
    category: "Documentation",
    icon: Github,
  },
  {
    title: "Conventional Commits",
    description: "A specification for adding human and machine-readable meaning to commit messages.",
    url: "https://www.conventionalcommits.org",
    category: "Best Practices",
    icon: Zap,
  },
  {
    title: "Semantic Versioning",
    description: "A simple set of rules for how version numbers are assigned and incremented.",
    url: "https://semver.org",
    category: "Best Practices",
    icon: Zap,
  },
  {
    title: "All Contributors",
    description: "Recognize all types of contributions, not just code. A specification and bot.",
    url: "https://allcontributors.org",
    category: "Community",
    icon: Users,
  },
  {
    title: "GitHub Actions Starter Workflows",
    description: "Ready-to-use CI/CD workflows for every language and framework.",
    url: "https://github.com/actions/starter-workflows",
    category: "Automation",
    icon: Zap,
  },
  {
    title: "The Legal Side of Open Source",
    description: "In-depth guide on the legal aspects of open source from the Open Source Initiative.",
    url: "https://opensource.org/licenses",
    category: "Licensing",
    icon: Shield,
  },
];

const categories = [...new Set(resources.map((r) => r.category))];

export default function ResourceHub() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-mono text-2xl font-bold">Resource Hub</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Curated links to the best open source guides, tools, and community resources.
        </p>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="space-y-3">
          <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">{cat}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {resources
              .filter((r) => r.category === cat)
              .map((resource) => (
                <a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="h-full transition-colors group-hover:border-primary/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <resource.icon className="h-4 w-4 text-primary" />
                          <CardTitle className="text-sm">{resource.title}</CardTitle>
                        </div>
                        <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground leading-relaxed">{resource.description}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
