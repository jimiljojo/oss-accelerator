import { useState, useRef, useEffect } from "react";
import { Copy, Check, MessageSquare, Send, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface License {
  id: string;
  name: string;
  spdx: string;
  description: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  popular: boolean;
}

const licenses: License[] = [
  {
    id: "mit", name: "MIT License", spdx: "MIT",
    description: "A short, permissive license. Do almost anything with the code as long as you include the original copyright.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use"],
    conditions: ["License & copyright notice"],
    limitations: ["Liability", "Warranty"],
    popular: true,
  },
  {
    id: "apache", name: "Apache License 2.0", spdx: "Apache-2.0",
    description: "Permissive license with patent protection. Companies love it because it explicitly grants patent rights.",
    permissions: ["Commercial use", "Modification", "Distribution", "Patent use", "Private use"],
    conditions: ["License & copyright notice", "State changes"],
    limitations: ["Trademark use", "Liability", "Warranty"],
    popular: true,
  },
  {
    id: "gpl3", name: "GNU GPL v3", spdx: "GPL-3.0",
    description: "Strong copyleft — any derivative work must also be open source under the same license.",
    permissions: ["Commercial use", "Modification", "Distribution", "Patent use", "Private use"],
    conditions: ["Disclose source", "License & copyright notice", "Same license", "State changes"],
    limitations: ["Liability", "Warranty"],
    popular: true,
  },
  {
    id: "bsd2", name: "BSD 2-Clause", spdx: "BSD-2-Clause",
    description: "Simple and permissive. Similar to MIT but with slightly different wording.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use"],
    conditions: ["License & copyright notice"],
    limitations: ["Liability", "Warranty"],
    popular: false,
  },
  {
    id: "mpl", name: "Mozilla Public License 2.0", spdx: "MPL-2.0",
    description: "File-level copyleft — modified files must stay open, but you can combine with proprietary code.",
    permissions: ["Commercial use", "Modification", "Distribution", "Patent use", "Private use"],
    conditions: ["Disclose source (modified files)", "License & copyright notice", "Same license (modified files)"],
    limitations: ["Trademark use", "Liability", "Warranty"],
    popular: false,
  },
  {
    id: "unlicense", name: "The Unlicense", spdx: "Unlicense",
    description: "Dedicate to the public domain. No conditions at all — do whatever you want.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use"],
    conditions: [],
    limitations: ["Liability", "Warranty"],
    popular: false,
  },
];

const quickPickQuestions = [
  { q: "Do you want companies to be able to use your code without open-sourcing theirs?", yes: ["mit", "apache", "bsd2", "mpl", "unlicense"], no: ["gpl3"] },
  { q: "Do you need patent protection?", yes: ["apache", "gpl3", "mpl"], no: ["mit", "bsd2", "unlicense"] },
  { q: "Should modifications to your code always remain open source?", yes: ["gpl3", "mpl"], no: ["mit", "apache", "bsd2", "unlicense"] },
];

export default function LicenseExplorer() {
  const [copied, setCopied] = useState<string | null>(null);
  const [quickPickStep, setQuickPickStep] = useState(0);
  const [quickPickAnswers, setQuickPickAnswers] = useState<boolean[]>([]);

  const copyLicenseId = (spdx: string) => {
    navigator.clipboard.writeText(spdx);
    setCopied(spdx);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleQuickPick = (answer: boolean) => {
    const newAnswers = [...quickPickAnswers, answer];
    setQuickPickAnswers(newAnswers);
    if (quickPickStep < quickPickQuestions.length - 1) {
      setQuickPickStep(quickPickStep + 1);
    }
  };

  const getRecommendation = () => {
    if (quickPickAnswers.length < quickPickQuestions.length) return null;
    const scores: Record<string, number> = {};
    licenses.forEach((l) => (scores[l.id] = 0));
    quickPickAnswers.forEach((ans, i) => {
      const pool = ans ? quickPickQuestions[i].yes : quickPickQuestions[i].no;
      pool.forEach((id) => (scores[id] = (scores[id] || 0) + 1));
    });
    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return licenses.find((l) => l.id === best)!;
  };

  const recommendation = getRecommendation();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-mono text-2xl font-bold">License Explorer</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the right open source license. No law degree needed.
        </p>
      </div>

      <Tabs defaultValue="cards">
        <TabsList>
          <TabsTrigger value="cards">Browse</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
          <TabsTrigger value="quickpick">Quick Pick</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {licenses.map((license) => (
              <Card key={license.id} className="transition-colors hover:border-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{license.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {license.popular && <Badge variant="secondary" className="text-[10px]">Popular</Badge>}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{license.spdx}</code>
                    </div>
                  </div>
                  <CardDescription className="text-xs">{license.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-medium text-primary">Permissions:</span>{" "}
                      <span className="text-muted-foreground">{license.permissions.join(", ")}</span>
                    </div>
                    {license.conditions.length > 0 && (
                      <div>
                        <span className="font-medium text-orange-400 dark:text-yellow-400">Conditions:</span>{" "}
                        <span className="text-muted-foreground">{license.conditions.join(", ")}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-destructive">Limitations:</span>{" "}
                      <span className="text-muted-foreground">{license.limitations.join(", ")}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-3" onClick={() => copyLicenseId(license.spdx)}>
                    {copied === license.spdx ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
                    {copied === license.spdx ? "Copied" : "Copy SPDX"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compare" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-mono text-xs">Feature</TableHead>
                    {licenses.slice(0, 4).map((l) => (
                      <TableHead key={l.id} className="font-mono text-xs">{l.spdx}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Commercial use", "Modification", "Patent use", "Disclose source", "Same license"].map((feature) => (
                    <TableRow key={feature}>
                      <TableCell className="text-xs">{feature}</TableCell>
                      {licenses.slice(0, 4).map((l) => (
                        <TableCell key={l.id} className="text-center">
                          {l.permissions.includes(feature) ? (
                            <Check className="mx-auto h-3.5 w-3.5 text-primary" />
                          ) : l.conditions.includes(feature) ? (
                            <span className="text-xs text-orange-400 dark:text-yellow-400">Required</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quickpick" className="mt-6">
          <Card className="max-w-xl">
            <CardContent className="pt-6">
              {!recommendation ? (
                <div className="space-y-6">
                  <p className="font-mono text-xs text-muted-foreground">
                    Question {quickPickStep + 1} of {quickPickQuestions.length}
                  </p>
                  <p className="text-lg font-medium">{quickPickQuestions[quickPickStep].q}</p>
                  <div className="flex gap-3">
                    <Button onClick={() => handleQuickPick(true)}>Yes</Button>
                    <Button variant="outline" onClick={() => handleQuickPick(false)}>No</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-mono text-xs text-primary">Recommended license</p>
                  <h3 className="text-xl font-bold">{recommendation.name}</h3>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                  <Button variant="outline" onClick={() => { setQuickPickStep(0); setQuickPickAnswers([]); }}>
                    Start Over
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
