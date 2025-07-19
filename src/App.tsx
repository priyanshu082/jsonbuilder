import { ThemeProvider } from "@/components/theme-provider"
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <div className="min-h-screen h-screen flex flex-col overflow-hidden">
        <Router>
          <Navbar />
          <div className="flex-1 min-h-0 overflow-auto bg-blue-950">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App