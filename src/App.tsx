import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chatbot from "./pages/Chatbot";
import BookAppointment from "./pages/BookAppointment";
import Ambulance from "./pages/Ambulance";
import Pharmacy from "./pages/Pharmacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/faqs" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/ambulance" element={<Ambulance />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
