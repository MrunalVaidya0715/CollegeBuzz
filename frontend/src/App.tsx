import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Posts from "./pages/posts/Posts";
import PostDetail from "./pages/posts/PostDetail";
import ScrollToTopOnPageChange from "./lib/utils";
import Explore from "./pages/explore/Explore";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "./components/ui/toaster";
import Contribute from "./pages/contribute/Contribute";
import MyQuestions from "./pages/my-questions/MyQuestions";
import Profile from "./pages/profile/Profile";
import AskButton from "./components/ask-button/AskButton";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const queryClient = new QueryClient();
  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={clientId}>
            <Navbar />
            <AskButton />
            <main className="w-full min-h-dvh flex flex-col items-center justify-between ">
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route path="" element={<Posts />} />
                  <Route path="posts/:id" element={<PostDetail />} />
                  <Route path="explore" element={<Explore />} />
                  <Route path="contribute" element={<Contribute />} />
                  <Route path="my-questions" element={<MyQuestions />} />
                  <Route path="profile/:userId" element={<Profile />} />
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
