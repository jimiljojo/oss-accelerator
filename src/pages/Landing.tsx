import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, Scale, FileText, Rocket, Wrench, BookOpen, Terminal, Sprout, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const modules = [
  {
    icon: Scale,
    title: "License Explorer",
    description: "Interactive license comparison and a Quick Pick wizard.",
    href: "/license-explorer",
    color: "text-primary",
  },
  {
    icon: FileText,
    title: "Doc Generator",
    description: "Generate README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY & more with live preview and .zip export.",
    href: "/doc-generator",
    color: "text-primary",
  },
  {
    icon: Rocket,
    title: "Launch Planner",
    description: "Complete launch roadmap with timeline, announcement templates, and distribution channels by tech stack.",
    href: "/launch-checklist",
    color: "text-primary",
  },
  {
    icon: Sprout,
    title: "Growth Toolkit",
    description: "Get contributors, handle PRs, manage issues, governance templates, and maintainer mental health guide.",
    href: "/growth-toolkit",
    color: "text-primary",
  },
  {
    icon: Wrench,
    title: "Maintenance Tools",
    description: "Issue template generators, bot configuration guides, and automation setup.",
    href: "/maintenance",
    color: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Resource Hub",
    description: "Curated links to GitHub best practices, popular OSS tools, and community guides.",
    href: "/resources",
    color: "text-primary",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm font-bold">oss-accelerator</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link to="/doc-generator">
                Get Started <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 pt-14">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground">Free &amp; open source</span>
          </div>
          <h1 className="font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Ship your open source
            <br />
            <span className="text-primary">with confidence</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Practical tools for open source docs, licensing, launch planning, and maintenance. This demo runs in your browser.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="font-mono">
              <Link to="/doc-generator">
                <Terminal className="mr-2 h-4 w-4" />
                Start Building
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-mono">
              <Link to="/resources">
                Browse Resources
              </Link>
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            No sign-up required. All tools work anonymously.
          </p>
        </motion.div>
      </section>

      {/* Modules Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <motion.p
          className="mb-8 text-center font-mono text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your complete open-source toolkit
        </motion.p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.href}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Link
                to={mod.href}
                className="group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <mod.icon className={`mb-3 h-5 w-5 ${mod.color}`} />
                <h3 className="font-mono text-sm font-bold">{mod.title}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {mod.description}
                </p>
                <div className="mt-4 flex items-center font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open tool <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <span className="font-mono text-xs text-muted-foreground">
            Built for the open-source community
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            No login required
          </span>
        </div>
      </footer>
    </div>
  );
}
