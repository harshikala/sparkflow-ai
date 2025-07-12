
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Warehouse from "./pages/Warehouse";
import Delivery from "./pages/Delivery";
import Forecasting from "./pages/Forecasting";
import Trending from "./pages/Trending";
import Customers from "./pages/Customers";
import Markdowns from "./pages/Markdowns";
import Simulations from "./pages/Simulations";
import Alerts from "./pages/Alerts";
import Returns from "./pages/Returns";
import Training from "./pages/Training";
import Copilot from "./pages/Copilot";
import Privacy from "./pages/Privacy";
import Preferences from "./pages/Preferences";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="warehouse" element={<Warehouse />} />
              <Route path="delivery" element={<Delivery />} />
              <Route path="forecasting" element={<Forecasting />} />
              <Route path="trending" element={<Trending />} />
              <Route path="customers" element={<Customers />} />
              <Route path="markdowns" element={<Markdowns />} />
              <Route path="simulations" element={<Simulations />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="returns" element={<Returns />} />
              <Route path="training" element={<Training />} />
              <Route path="copilot" element={<Copilot />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="preferences" element={<Preferences />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
