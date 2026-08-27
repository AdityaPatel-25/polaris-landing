/**
 * Orbital Editorial design system: dark research-observatory surfaces, Aurora Cyan
 * signals, and unobtrusive navigation that foregrounds the polar science narrative.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PolarisProvider } from "./contexts/PolarisContext";
import { AdminRoutes } from "./pages/AdminPortal";
import Home from "./pages/Home";
import { ResearcherRoutes } from "./pages/ResearcherPortal";
import RoleSelection from "./pages/RoleSelection";
import { UserRoutes } from "./pages/UserPortal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/choose" component={RoleSelection} />
      <Route path="/user/repository/:id" component={UserRoutes} />
      <Route path="/user/learn/quiz" component={UserRoutes} />
      <Route path="/user/:section" component={UserRoutes} />
      <Route path="/user" component={UserRoutes} />
      <Route path="/researcher/:section" component={ResearcherRoutes} />
      <Route path="/researcher" component={ResearcherRoutes} />
      <Route path="/admin/:section" component={AdminRoutes} />
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <PolarisProvider>
          <TooltipProvider>
            <Toaster richColors position="bottom-right" />
            <Router />
          </TooltipProvider>
        </PolarisProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
