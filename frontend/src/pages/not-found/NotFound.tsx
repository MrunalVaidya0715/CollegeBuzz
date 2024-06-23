import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { IoRocketOutline } from "react-icons/io5";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main
      className="min-h-[calc(100dvh-4rem)] flex items-center justify-center"
      aria-label="Page not found"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="text-center -space-y-1">
          <p className="text-7xl font-extrabold">404</p>
          <p className="text-lg font-medium">Page Not Found</p>
        </div>
        <Button
          onClick={() => navigate("/")}
          aria-label="Go to Home"
          className="h-14 group gap-3 text-lg"
        >
          Go Home
          <IoRocketOutline className="w-7 h-7 group-hover:text-yellow-300 transition-colors duration-200 ease-in-out" />
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
