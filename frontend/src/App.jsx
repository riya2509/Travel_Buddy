import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Test from "./Components/Test";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
}

export default App;
