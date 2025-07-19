import { ThemeProvider } from "@/components/theme-provider"
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <Navbar />
      <Home/>
      <Footer />
    </ThemeProvider>
  );
}

export default App