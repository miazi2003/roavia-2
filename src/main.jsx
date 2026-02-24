import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router"; // Note: 'react-router-dom' is usually preferred here, but if 'react-router' works for you, keep it.

import AuthProvider from "./Context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { router } from "./router/router.jsx";

// 1. Import the SmoothScroll component
import SmoothScroll from "./Component/smooth scroll/SmoothScroll.jsx"; 

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* 2. Add it here. It will activate smooth scrolling globally. */}
        <SmoothScroll /> 
        
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);