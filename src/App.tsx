import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Stripboard from "./pages/Stripboard";
import Crew from "./pages/Crew";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout title="Dashboard"><Dashboard /></Layout>} />
            <Route path="/projects" element={<Layout title="Projects"><Projects /></Layout>} />
            <Route path="/stripboard" element={<Layout title="Stripboard"><Stripboard /></Layout>} />
            <Route path="/crew" element={<Layout title="Crew"><Crew /></Layout>} />
            <Route path="/reports" element={<Layout title="Reports"><Reports /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;