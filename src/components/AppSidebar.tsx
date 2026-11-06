import {
  Search, Scale, FileText, Rocket, Wrench, BookOpen, Terminal, Sprout, ClipboardCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const tools = [
  { title: "License Explorer", url: "/license-explorer", icon: Scale },
  { title: "Doc Generator", url: "/doc-generator", icon: FileText },
  { title: "Launch Planner", url: "/launch-checklist", icon: Rocket },
  { title: "Growth Toolkit", url: "/growth-toolkit", icon: Sprout },
  { title: "Maintenance", url: "/maintenance", icon: Wrench },
];

const resources = [
  { title: "Resource Hub", url: "/resources", icon: BookOpen },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 py-5">
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              OSS Accelerator
            </span>
          </Link>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            ship open source with confidence
          </p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-widest">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-accent/10"
                      activeClassName="bg-accent/15 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-widest">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resources.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-accent/10"
                      activeClassName="bg-accent/15 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground">v0.1.0</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
