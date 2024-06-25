import { MenuLinks } from "@/data/links";
import useAuthStore from "@/store/useAuth";
import { Link, useLocation } from "react-router-dom";
import { RiQuestionAnswerLine } from "react-icons/ri";
const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  return (
    <aside className="sticky top-[5rem] w-[30%] h-fit hidden lg:flex">
      <ul className="w-full flex flex-col gap-2">
        {MenuLinks.map((link) => (
          <Link key={link.id} to={link.url}>
            <li
              className={` ${
                location.pathname === link.url
                  ? "bg-blue-200 text-blue-600 border-l-4 border-blue-700"
                  : "text-gray-500"
              } group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2  items-center`}
            >
              <span className="group-hover:text-gray-800">{link.icon}</span>
              <p className=" whitespace-nowrap group-hover:text-gray-800">
                {link.name}
              </p>
            </li>
          </Link>
        ))}
        {user && (
          <Link to={"my-questions"}>
            <li
              className={` ${
                location.pathname === "/my-questions"
                  ? "bg-blue-200 text-blue-600 border-l-4 border-blue-700"
                  : "text-gray-500"
              } group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2  items-center`}
            >
              <span className="group-hover:text-gray-800"><RiQuestionAnswerLine className=" w-[20px] h-[20px]"/></span>
              <p className=" whitespace-nowrap group-hover:text-gray-800">
                My Questions
              </p>
            </li>
          </Link>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
