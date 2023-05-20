import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Login from "./Components/Login";
import React from "react";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
