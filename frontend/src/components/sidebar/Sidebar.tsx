import { MenuLinks } from "@/data/links";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sticky top-[4.5rem] w-[25%] h-fit hidden lg:flex">
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
      </ul>
    </aside>
  );
};

export default Sidebar;
