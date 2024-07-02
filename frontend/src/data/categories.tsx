import { GrTechnology } from "react-icons/gr";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoIosFootball } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { PiBinary } from "react-icons/pi";

export const CategoriesOptions = [
  {
    id: 1,
    name: "All",
    value: "all",
    icon: null,
  },
  {
    id: 2,
    name: "General",
    value: "general",
    icon: <MdOutlineCategory className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "Technology",
    value: "technology",
    icon: <GrTechnology className="w-6 h-6" />,
  },

  {
    id: 4,
    name: "Career",
    value: "career",
    icon: <IoBriefcaseOutline className="w-6 h-6" />,
  },

  {
    id: 5,
    name: "Sports",
    value: "sports",
    icon: <IoIosFootball className="w-6 h-6" />,
  },

  {
    id: 6,
    name: "Faculty",
    value: "faculty",
    icon: <FiUsers className="w-6 h-6" />,
  },

  {
    id: 7,
    name: "Programming",
    value: "programming",
    icon: <PiBinary className="w-6 h-6" />,
  },
  {
    id: 8,
    name: "Academics",
    value: "academics",
    icon: <RiGraduationCapLine className="w-6 h-6" />,
  },
];

export const BgColors = [
  "#2f4f4f", //DarSlate
  "#006400", // darkgreen
  "#ff4500", // orangeRed
  "#191970", // midnightBlue
  "#ff1493", // deepPink
  "#00ff00", // lime
  "#ff00ff", // fuchia
  "#0000ff", // blue
];
