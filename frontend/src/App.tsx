import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className="wfull min-h-dvh pt-16 flex flex-col items-center justify-between ">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
