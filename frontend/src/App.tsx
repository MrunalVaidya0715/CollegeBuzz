import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className="wfull min-h-dvh pt-16 flex flex-col items-center justify-between ">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
