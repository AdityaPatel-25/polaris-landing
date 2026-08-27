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
import { AccessBarrier } from "./components/AccessBarrier";
import { AdminRoutes } from "./pages/AdminPortal";
import AccessGateway from "./pages/AccessGateway";
import Home from "./pages/Home";
import { ResearcherRoutes } from "./pages/ResearcherPortal";
import { UserRoutes } from "./pages/UserPortal";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/access" component={AccessGateway} />
      <Route path="/choose" component={AccessGateway} />
      <Route path="/user/repository/:id">{() => <AccessBarrier role="Explorer"><UserRoutes /></AccessBarrier>}</Route>
      <Route path="/user/learn/quiz">{() => <AccessBarrier role="Explorer"><UserRoutes /></AccessBarrier>}</Route>
      <Route path="/user/:section">{() => <AccessBarrier role="Explorer"><UserRoutes /></AccessBarrier>}</Route>
      <Route path="/user">{() => <AccessBarrier role="Explorer"><UserRoutes /></AccessBarrier>}</Route>
      <Route path="/researcher/:section">{() => <AccessBarrier role="Researcher"><ResearcherRoutes /></AccessBarrier>}</Route>
      <Route path="/researcher">{() => <AccessBarrier role="Researcher"><ResearcherRoutes /></AccessBarrier>}</Route>
      <Route path="/admin/:section">{() => <AccessBarrier role="Command"><AdminRoutes /></AccessBarrier>}</Route>
      <Route path="/admin">{() => <AccessBarrier role="Command"><AdminRoutes /></AccessBarrier>}</Route>
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
