import Section from "@/components/section/Section";
import Sidebar from "@/components/sidebar/Sidebar";
import FilterSort from "@/components/filter-sort/FilterSort";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-16 w-full min-h-dvh flex justify-center">
      <div className=" md:p-2 w-full max-w-[1200px] flex justify-between gap-4">
        <Sidebar />
        <div className="  px-2 h-auto w-full flex flex-col justify-start gap-1 lg:gap-0  scroll-smooth">
          <FilterSort />
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <Section />
      </div>
    </div>
  );
};

export default Home;
