import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Posts from "./pages/posts/Posts";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className="w-full min-h-dvh flex flex-col items-center justify-between ">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="" element={<Posts />} />
              <Route path="posts/:id" element={<PostDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
