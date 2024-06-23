import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-16 w-full min-h-dvh flex justify-center">
      <div className="p-2 w-full max-w-[1200px] flex justify-between">
        <Sidebar />
        <div className=" overflow-y-auto h-full w-full flex flex-col  p-2 scroll-smooth">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
