import { MdCircle } from "react-icons/md";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { RiDeleteBin6Line, RiEditLine, RiFlagLine } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Answer } from "@/components/answers/Answers";
import DOMPurify from "dompurify";
import { TimeAgo } from "@/lib/utils";
import useAuthStore from "@/store/useAuth";
import VotesAnswers from "@/components/votes/VotesAnswers";

interface AnswerCardProps {
  answer: Answer;
}

const AnswerCard = ({ answer }: AnswerCardProps) => {
  const user = useAuthStore((state) => state.user);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const sanitizedContent = DOMPurify.sanitize(answer.content || "");
  return (
    <section className="p-4 w-full flex flex-col gap-2 bg-white border-1 border-gray-300">
      {/* User, Action */}
      <div className="pb-2 flex items-center justify-between  gap-2  border-b-1 border-gray-200">
        {/* User */}
        <div className=" flex items-center gap-2">
          <div className=" flex items-center gap-2">
            <div className=" w-[30px] aspect-square rounded-full overflow-hidden bottom-1 border-gray-200">
              <img
                className=" w-full h-full object-cover object-center"
                src={answer.userId.profileImg || "/assets/no-profile.png"}
                alt={answer.userId.username}
              />
            </div>
            <h2 className=" text-blue-500 text-sm font-medium">
              {user && answer.userId._id === user?._id
                ? "You"
                : answer.userId.username}
            </h2>
          </div>
          <MdCircle className=" w-2 h-2 text-gray-300" />
          <p className=" text-gray-500 text-sm">{TimeAgo(answer.createdAt)}</p>
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
            {user?._id === answer.userId._id ? (
              <>
                <div className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black">
                  <RiEditLine className=" w-5 h-5" />
                  <p>Edit</p>
                </div>
                <div className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black">
                  <RiDeleteBin6Line className=" w-5 h-5" />
                  <p>Delete</p>
                </div>
              </>
            ) : (
              <div className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black">
                <RiFlagLine className=" w-5 h-5" />
                <p className=" whitespace-nowrap">Report Post</p>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      {/* Description */}
      <div className="w-full   ">
        <div
          className="w-full max-w-full prose leading-6 -space-y-0  prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-h3:font-medium prose-a:text-sm prose-a:text-blue-500 prose-a:hover:text-blue-800 prose-a:hover:underline "
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></div>
      </div>
      {/* Upvote and Answer */}
      <div className="mt-2 w-full flex items-center justify-end gap-2">
        {/* Upvote */}
        <VotesAnswers id={answer._id} upvote={answer.upvote} downvote={answer.downvote} isUpvoted={new Map(Object.entries(answer.isUpvoted))} isDownvoted={new Map(Object.entries(answer.isDownvoted))}/>
      </div>
    </section>
  );
};

export default AnswerCard;
