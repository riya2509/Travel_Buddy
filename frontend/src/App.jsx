import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import Routes from "./Routes";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
