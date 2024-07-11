import { LiaHandsHelpingSolid } from "react-icons/lia";

import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore} from "react-icons/md";

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

export const FilterOptions = [
  {
    id: 1,
    name: "All",
    value: "all",
  },
  {
    id: 2,
    name: "General",
    value: "general",
  },
  {
    id: 3,
    name: "Technology",
    value: "technology",
  },

  {
    id: 4,
    name: "Career",
    value: "career",
  },

  {
    id: 5,
    name: "Sports",
    value: "sports",
  },

  {
    id: 6,
    name: "Programming",
    value: "programming",
  },

  {
    id: 7,
    name: "Faculty",
    value: "faculty",
  },
  {
    id: 8,
    name: "Academics",
    value: "academics",
  },
];


