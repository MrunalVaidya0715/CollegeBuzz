import { LiaHandsHelpingSolid } from "react-icons/lia";

import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";

export const MenuLinks = [
    {
      id: 1,
      name: "Home",
      url: "/",
      icon: <AiOutlineHome size={22} />,
    },
    {
      id: 2,
      name: "Explore Questions",
      url: "/explore",
      icon: <MdOutlineExplore size={22} />,
    },
    {
      id: 3,
      name: "Contribute",
      url: "/contribute",
      icon: <LiaHandsHelpingSolid size={22} />,
    },
  ];