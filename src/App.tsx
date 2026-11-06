import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Landing from "./pages/Landing";
import LicenseExplorer from "./pages/LicenseExplorer";
import DocGenerator from "./pages/DocGenerator";
import LaunchChecklist from "./pages/LaunchChecklist";
import GrowthToolkit from "./pages/GrowthToolkit";
import Maintenance from "./pages/Maintenance";
import ResourceHub from "./pages/ResourceHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/license-explorer" element={<LicenseExplorer />} />
            <Route path="/doc-generator" element={<DocGenerator />} />
            <Route path="/launch-checklist" element={<LaunchChecklist />} />
            <Route path="/growth-toolkit" element={<GrowthToolkit />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/resources" element={<ResourceHub />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
