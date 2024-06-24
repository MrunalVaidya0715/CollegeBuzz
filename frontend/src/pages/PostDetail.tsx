import { MdArrowDownward, MdArrowUpward, MdCircle } from "react-icons/md";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { RiDeleteBin6Line, RiEditLine, RiFlagLine } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Answers from "@/components/answers/Answers";

const PostDetail = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  return (
    <div className="pt-2 w-full flex flex-col gap-4">
      {/* Post */}
      <section className="p-4 w-full flex flex-col gap-2 bg-white border-1 border-gray-300">
        {/* User, Action */}
        <div className="pb-2 flex items-center justify-between  gap-2  border-b-1 border-gray-200">
          {/* User */}
          <div className=" flex items-center gap-2">
            <div className=" flex items-center gap-2">
              <div className=" w-[30px] aspect-square overflow-hidden bottom-1 border-gray-200">
                <img
                  className=" w-full h-full object-cover object-center"
                  src="/assets/no-profile.png"
                  alt="ProfilePic"
                />
              </div>
              <h2 className=" text-blue-500 text-sm font-medium">
                Mrunal Vaidya
              </h2>
            </div>
            <MdCircle className=" w-2 h-2 text-gray-300" />
            <p className=" text-gray-500 text-sm">1 Month ago</p>
          </div>
          {/* Action */}
          <Popover open={isActionsOpen} onOpenChange={setIsActionsOpen}>
            <PopoverTrigger>
              <div
                className={`cursor-pointer w-fit aspect-square ${
                  isActionsOpen ? "text-black bg-gray-200/80" : "text-gray-400"
                }  hover:text-black  rounded-full  `}
              >
                <IoEllipsisVerticalSharp className=" w-6 h-6 transition-colors duration-200 ease-in-out" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="absolute -right-1 flex flex-col gap-3 max-w-fit">
              <div className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black">
                <RiEditLine className=" w-5 h-5" />
                <p>Edit</p>
              </div>
              <div className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black">
                <RiDeleteBin6Line className=" w-5 h-5" />
                <p>Delete</p>
              </div>
              <div className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black">
                <RiFlagLine className=" w-5 h-5" />
                <p className=" whitespace-nowrap">Report Post</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* Category & Title */}
        <div className=" space-y-1 ">
          <div className="px-4 py-1 w-fit bg-orange-400  rounded-full">
            <h2 className=" text-sm text-white font-medium">Technology</h2>
          </div>
          <h1 className=" text-lg font-[600]">
            How can I improve my coding skills as a computer science student?
          </h1>
        </div>
        {/* Description */}
        <div className="p-2 border-1 border-gray-200">
          <p className=" text-gray-800">
            I'm from computer science branch and I want to become a better
            programmer. Any tips for practicing and learning new programming
            languages? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Saepe, perferendis.
          </p>
        </div>
        {/* Upvote and Answer */}
        <div className="mt-2 w-full flex items-center justify-between gap-2">
          {/* Upvote */}
          <div className=" flex items-center gap-2">
            <MdArrowUpward className=" w-7 h-7 text-gray-400" />
            <p className=" font-bold">5</p>
            <MdArrowDownward className=" w-7 h-7 text-gray-400" />
          </div>
          <Button disabled variant={"outline"} aria-label="Add Answer">Answer</Button>
        </div>
      </section>
      <Answers/>
    </div>
  );
};

export default PostDetail;
