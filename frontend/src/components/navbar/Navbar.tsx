import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { MenuLinks } from "@/data/links";
import Login from "../login/Login";

const Navbar = () => {
  const user = false;
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <header className="z-[100] fixed top-0 left-0 h-16 w-screen flex justify-center bg-white border-b-1 border-gray-300 shadow-md">
      <nav className="relative p-2 w-full h-full max-w-[1200px] flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"} aria-label="CollegeBuzz Home">
          <h1 className="flex text-lg font-bold">
            C<span className="hidden sm:block">ollege</span>
            <span className=" text-blue-600 flex">
              B<span className="hidden sm:block">uzz</span>
            </span>
          </h1>
        </Link>
        {/* Search */}
        <div className="absolute left-1/2 -translate-x-1/2 px-2 py-1 h-9 flex items-center gap-2 text-gray-400 bg-gray-100 border-1 border-gray-200  rounded-lg">
          <BiSearch className=" text-[20px] md:text-[22px]" />
          <input
            value={searchText}
            onChange={handleSearchTextChange}
            className="p-1 text-black text-sm md:text-base w-full bg-transparent outline-none rounded-md"
            type="text"
            placeholder="Search by title"
          />
        </div>
        {/* Login/User */}
        <section>
          {user ? (
            <div
              className={`w-[35px] aspect-square border-1 ${
                isPopOpen ? "border-black" : "border-gray-300"
              } rounded-full overflow-hidden transition-colors duration-200 ease-in-out`}
            >
              <Popover open={isPopOpen} onOpenChange={setIsPopOpen}>
                <PopoverTrigger>
                  <img
                    className=" w-full h-full object-cover object-center"
                    src="/assets/no-profile.png"
                    alt="no-profile-img"
                  />
                </PopoverTrigger>
                <PopoverContent className="mr-2 translate-y-4 max-w-[250px] ">
                  <ul className=" w-full flex flex-col">
                    {MenuLinks.map((mLink) => (
                      <Link
                        onClick={() => setIsPopOpen(false)}
                        key={mLink.name}
                        to={mLink.url}
                      >
                        <li className="flex lg:hidden group p-2 text-sm md:text-base font-medium w-full hover:bg-gray-100  gap-2 text-gray-400 items-center transition-all duration-200 ease-in-out">
                          <span className="group-hover:text-gray-800">
                            {mLink.icon}
                          </span>
                          <p className="group-hover:text-gray-800">
                            {mLink.name}
                          </p>
                        </li>
                      </Link>
                    ))}

                    <Link onClick={() => setIsPopOpen(false)} to={"/profile"}>
                      <li className=" group p-2 text-sm md:text-base font-medium w-full hover:bg-gray-100 flex gap-2 text-gray-400 items-center transition-all duration-200 ease-in-out">
                        <span className="group-hover:text-gray-800">
                          <CgProfile size={22} />
                        </span>
                        <p className="group-hover:text-gray-800">Profile</p>
                      </li>
                    </Link>
                    <li
                      onClick={() => setIsPopOpen(false)}
                      className=" group cursor-pointer p-2 text-sm md:text-base font-medium w-full hover:bg-gray-100 flex gap-2 text-gray-400 items-center transition-all duration-200 ease-in-out"
                    >
                      <span className="group-hover:text-gray-800">
                        <MdOutlineLogout size={22} />
                      </span>
                      <p className="group-hover:text-gray-800">Logout</p>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button
              onClick={() => setIsLoginOpen(true)}
              variant={"outline"}
              aria-label="Login"
            >
              Login
            </Button>
          )}
        </section>
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogContent className=" max-w-[95%] sm:max-w-[450px] md:max-w-[550px] rounded-lg">
            <DialogHeader>
              <DialogTitle className=" text-center">
                Login to continue
              </DialogTitle>
              <DialogDescription className=" text-center">
                Please log in to continue connecting with your college peers
              </DialogDescription>
              <Login/>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  );
};

export default Navbar;
