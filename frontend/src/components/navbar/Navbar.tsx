import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Button } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { MenuLinks } from "@/data/links";
import LoginDialog from "../dialogs/LoginDialog";
import apiRequest from "@/lib/apiRequest";
import useAuthStore from "@/store/useAuth";
import { useToast } from "../ui/use-toast";
import useDialogStore from "@/store/useDialogStore";
import Search from "./Search";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const isLoginOpen = useDialogStore((state) => state.isLoginOpen);
  const setIsLoginOpen = useDialogStore((state) => state.setIsLoginOpen);
  const clearUser = useAuthStore((state) => state.clearUser);
  
  const [isPopOpen, setIsPopOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("auth/logout");
      if (res.data === "User has been logged out") {
        clearUser();
        navigate("/");
        toast({ title: "Logged Out Successfully!" });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Try Again",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        <Search />

        {/* Login/User */}
        <section>
          {user ? (
            <div
              className={`w-[45px] aspect-square border-1 ${
                isPopOpen ? "border-gray-200/80" : "border-transparent"
              } border-[6px]  hover:border-gray-200/50 rounded-full overflow-hidden transition-colors duration-200 ease-in-out`}
            >
              <Popover open={isPopOpen} onOpenChange={setIsPopOpen}>
                <PopoverTrigger>
                  <img
                    className=" w-full h-full object-cover object-center"
                    src={user?.profileImg || "/assets/no-profile.png"}
                    alt={user.username || "no-profile-img"}
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

                    <Link
                      onClick={() => setIsPopOpen(false)}
                      to={`/profile/${user._id}`}
                    >
                      <li className=" group p-2 text-sm md:text-base font-medium w-full hover:bg-gray-100 flex gap-2 text-gray-400 items-center transition-all duration-200 ease-in-out">
                        <span className="group-hover:text-gray-800">
                          <CgProfile size={22} />
                        </span>
                        <p className="group-hover:text-gray-800">Profile</p>
                      </li>
                    </Link>
                    <li
                      onClick={() => {
                        handleLogout();
                        setIsPopOpen(false);
                      }}
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
        <LoginDialog
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      </nav>
    </header>
  );
};

export default Navbar;
