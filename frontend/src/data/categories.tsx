
import { GrTechnology } from "react-icons/gr";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoIosFootball } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { IoBriefcaseOutline, IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";

export const CategoriesOptions = [
    {
      id: 1,
      name: "All",
      value: "all",
      icon: null
    },
    {
      id: 2,
      name: "General",
      value: "general",
      icon: <MdOutlineCategory className="w-6 h-6"/>
    },
    {
      id: 3,
      name: "Technology",
      value: "technology",
      icon: <GrTechnology className="w-6 h-6"/>
    },
  
    {
      id: 4,
      name: "Career",
      value: "career",
      icon: <IoBriefcaseOutline className="w-6 h-6"/>
    },
  
    {
      id: 5,
      name: "Sports",
      value: "sports",
      icon: <IoIosFootball className="w-6 h-6"/>
    },
  
    {
      id: 6,
      name: "Faculty",
      value: "faculty",
      icon: <FiUsers className="w-6 h-6"/>
    },
  
    {
      id: 7,
      name: "Canteen",
      value: "canteen",
      icon: <IoFastFoodOutline className="w-6 h-6"/>
    },
    {
      id: 8,
      name: "Academics",
      value: "academics",
      icon: <RiGraduationCapLine className="w-6 h-6"/>
    },
  ];
  
  export const BgColors = ["#E74C3C", "#9B59B6", "#3498DB", "#1ABC9C", "#F39C12", "#E67E22", "#E84393", "#3385FF"]