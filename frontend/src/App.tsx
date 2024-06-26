import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Posts from "./pages/posts/Posts";
import PostDetail from "./pages/PostDetail";
import ScrollToTopOnPageChange from "./lib/utils";
import Explore from "./pages/explore/Explore";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "./components/ui/toaster";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const queryClient = new QueryClient();
  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={clientId}>
            <Navbar />
            <main className="w-full min-h-dvh flex flex-col items-center justify-between ">
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route path="" element={<Posts />} />
                  <Route path="posts/:id" element={<PostDetail />} />
                  <Route path="explore" element={<Explore />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ScrollToTopOnPageChange />
              <Toaster />
            </main>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
