import { useState } from "react";
import { FileText, Download, Eye, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ProjectInfo {
  name: string;
  description: string;
  author: string;
  license: string;
  language: string;
  installCmd: string;
  usageExample: string;
}

const defaults: ProjectInfo = {
  name: "my-awesome-project",
  description: "A powerful tool that solves a real problem for developers.",
  author: "Your Name",
  license: "MIT",
  language: "TypeScript",
  installCmd: "npm install my-awesome-project",
  usageExample: "import { awesome } from 'my-awesome-project';\n\nawesome();",
};

function generateReadme(info: ProjectInfo) {
  return `# ${info.name}

> ${info.description}

## Installation

\`\`\`bash
${info.installCmd}
\`\`\`

## Usage

\`\`\`${info.language.toLowerCase()}
${info.usageExample}
\`\`\`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started.

## License

${info.license} — see [LICENSE](LICENSE) for details.

## Author

${info.author}
`;
}

function generateContributing(info: ProjectInfo) {
  return `# Contributing to ${info.name}

Thank you for your interest in contributing! Here's how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork: \`git clone https://github.com/YOUR_USERNAME/${info.name}.git\`
3. Create a branch: \`git checkout -b feature/your-feature\`
4. Make your changes
5. Run tests: \`npm test\`
6. Commit: \`git commit -m "feat: your feature description"\`
7. Push: \`git push origin feature/your-feature\`
8. Open a Pull Request

## Code Style

- Follow existing patterns in the codebase
- Write meaningful commit messages (we use [Conventional Commits](https://www.conventionalcommits.org/))
- Add tests for new features

## Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, ${info.language} version)

## Questions?

Open a discussion or reach out to ${info.author}.
`;
}

function generateCodeOfConduct() {
  return `# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to a positive environment:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community

Examples of unacceptable behavior:

* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information without explicit permission

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the project team. All complaints will be reviewed and investigated.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org), version 2.1.
`;
}

function generateSecurity(info: ProjectInfo) {
  return `# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in ${info.name}, please report it responsibly.

**Do NOT open a public GitHub issue.**

Instead, email: security@example.com

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge receipt within 48 hours and provide a detailed response within 7 days.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | ✅         |
| < 1.0   | ❌         |
`;
}

function generateGovernance(info: ProjectInfo) {
  return `# Governance

## Decision Making

${info.name} uses a consensus-seeking decision-making model.

### Roles

- **Maintainers**: Core team members who can merge PRs and make releases
- **Contributors**: Anyone who has had a PR merged
- **Users**: Anyone who uses the project

### Process

1. Proposals are made via GitHub Issues or Discussions
2. Maintainers discuss and seek consensus
3. If consensus cannot be reached, the lead maintainer has final say

## Becoming a Maintainer

Active contributors may be invited to become maintainers based on:
- Quality and consistency of contributions
- Participation in discussions and reviews
- Alignment with project values
`;
}

export default function DocGenerator() {
  const [info, setInfo] = useState<ProjectInfo>(defaults);
  const [preview, setPreview] = useState<string>("readme");
  const [copied, setCopied] = useState(false);

  const docs: Record<string, { label: string; content: string }> = {
    readme: { label: "README.md", content: generateReadme(info) },
    contributing: { label: "CONTRIBUTING.md", content: generateContributing(info) },
    coc: { label: "CODE_OF_CONDUCT.md", content: generateCodeOfConduct() },
    security: { label: "SECURITY.md", content: generateSecurity(info) },
    governance: { label: "GOVERNANCE.md", content: generateGovernance(info) },
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    Object.values(docs).forEach((doc) => zip.file(doc.label, doc.content));
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${info.name}-docs.zip`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(docs[preview].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const update = (key: keyof ProjectInfo, value: string) =>
    setInfo((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold">Documentation Generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate professional docs for your OSS project. Smart defaults so you never face a blank page.
          </p>
        </div>
        <Button onClick={handleDownloadZip}>
          <Download className="mr-2 h-4 w-4" />
          Download .zip
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Project Name</Label>
              <Input value={info.name} onChange={(e) => update("name", e.target.value)} className="font-mono text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Description</Label>
              <Textarea value={info.description} onChange={(e) => update("description", e.target.value)} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Author</Label>
                <Input value={info.author} onChange={(e) => update("author", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">License</Label>
                <Input value={info.license} onChange={(e) => update("license", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Language</Label>
              <Input value={info.language} onChange={(e) => update("language", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Install Command</Label>
              <Input value={info.installCmd} onChange={(e) => update("installCmd", e.target.value)} className="font-mono text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Usage Example</Label>
              <Textarea value={info.usageExample} onChange={(e) => update("usageExample", e.target.value)} rows={3} className="font-mono text-sm" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {Object.entries(docs).map(([key, doc]) => (
                <Button
                  key={key}
                  variant={preview === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreview(key)}
                  className="text-xs"
                >
                  {doc.label}
                </Button>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Card className="max-h-[600px] overflow-auto">
            <CardContent className="pt-4">
              <pre className="whitespace-pre-wrap font-mono text-xs text-muted-foreground">
                {docs[preview].content}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
