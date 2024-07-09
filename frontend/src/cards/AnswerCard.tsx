import { MdCircle } from "react-icons/md";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { RiDeleteBin6Line, RiEditLine, RiFlagLine } from "react-icons/ri";
import { BsReply } from "react-icons/bs";
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
import EditAnswerDialog from "@/components/dialogs/EditAnswerDialog";
import DeleteAnswerAlert from "@/components/dialogs/DeleteAnswerAlert";
import { Button } from "@/components/ui/button";
import AnswerReplyDialog from "@/components/dialogs/AnswerReplyDialog";
import { Link, useParams } from "react-router-dom";
import ReportAnswerDialog from "@/components/dialogs/ReportAnswerDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import apiRequest from "@/lib/apiRequest";
import useDialogStore from "@/store/useDialogStore";

interface AnswerCardProps {
  answer: Answer;
}

const AnswerCard = ({ answer }: AnswerCardProps) => {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { setIsLoginOpen } = useDialogStore();
  const sanitizedContent = DOMPurify.sanitize(answer.content || "");

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleAlertClick = () => {
    setIsAlertOpen(true);
  };

  const handleReplyClick = () => {
    if (user) {
      setIsReplyOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleReportClick = () => {
    setIsReportOpen(true);
  };
  const hasReported = answer.reportedBy.some(
    (report) => report.userId === user?._id
  );
  async function handleWithdrawReport() {
    try {
      const res = await apiRequest.put(`answers/report/${answer._id}`);
      if (res.data.message === "Answer Unreported") {
        queryClient.invalidateQueries({ queryKey: [`answers.${id}`] });
        toast({ title: res.data.message });
        setIsActionsOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Couldn't Withdraw Answer",
          description: "Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again!",
      });
      console.log(error);
    }
  }
  return (
    <section
      className={`p-4 w-full flex flex-col gap-2 bg-white ${
        hasReported ? "border-1 border-red-500" : "border-1 border-gray-300"
      } `}
    >
      {/* User, Action */}
      <div className="pb-2 flex items-center justify-between gap-2 border-b-1 border-gray-200">
        {/* User */}
        <div className="flex items-center gap-2">
          <Link to={`/profile/${answer.userId._id}`}>
            <div className="flex items-center gap-2">
              <div className="w-[30px] aspect-square rounded-full overflow-hidden bottom-1 border-gray-200">
                <img
                  className="w-full h-full object-cover object-center"
                  src={answer.userId.profileImg || "/assets/no-profile.png"}
                  alt={answer.userId.username}
                />
              </div>
              <h2 className="text-blue-500 text-sm font-medium">
                {user && answer.userId._id === user?._id
                  ? "You"
                  : answer.userId.username}
              </h2>
            </div>
          </Link>
          <MdCircle className="w-2 h-2 text-gray-300" />
          <p className="text-gray-500 text-sm">{TimeAgo(answer.createdAt)}</p>
        </div>
        {/* Action */}
        {user && (
          <Popover open={isActionsOpen} onOpenChange={setIsActionsOpen}>
            <PopoverTrigger>
              <div
                className={`cursor-pointer w-fit aspect-square ${
                  isActionsOpen ? "text-black bg-gray-200/80" : "text-gray-400"
                } hover:text-black rounded-full`}
              >
                <IoEllipsisVerticalSharp className="w-6 h-6 transition-colors duration-200 ease-in-out" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="absolute -right-1 flex flex-col gap-3 max-w-fit">
              {user?._id === answer.userId._id ? (
                <>
                  <div
                    onClick={handleEditClick}
                    className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black"
                  >
                    <RiEditLine className="w-5 h-5" />
                    <p>Edit</p>
                  </div>
                  <div
                    onClick={handleAlertClick}
                    className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-red-600"
                  >
                    <RiDeleteBin6Line className="w-5 h-5" />
                    <p>Delete</p>
                  </div>
                </>
              ) : hasReported ? (
                <div
                  onClick={handleWithdrawReport}
                  className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black"
                >
                  <RiFlagLine className="w-5 h-5" />
                  <p className="whitespace-nowrap">Withdraw Report</p>
                </div>
              ) : (
                <div
                  onClick={handleReportClick}
                  className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black"
                >
                  <RiFlagLine className="w-5 h-5" />
                  <p className="whitespace-nowrap">Report Answer</p>
                </div>
              )}
            </PopoverContent>
          </Popover>
        )}
      </div>
      {/* EditAnswerDialog */}
      <EditAnswerDialog
        answer={answer}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />
      <DeleteAnswerAlert
        id={answer._id}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
      />
      <ReportAnswerDialog
        isOpen={isReportOpen}
        setIsOpen={setIsReportOpen}
        id={answer._id}
      />
      {/* Description */}
      <div className="w-full">
        <div
          className="w-full max-w-full prose leading-6 -space-y-0 prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-h3:font-medium prose-a:text-sm prose-a:text-blue-500 prose-a:hover:text-blue-800 prose-a:hover:underline"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></div>
      </div>
      {/* Upvote and Answer */}

      {!answer.parentAnswer && (
        <div className=" w-full flex items-center justify-end gap-4">
          <Button
            onClick={handleReplyClick}
            variant={"ghost"}
            className=" text-gray-400 hover:text-black gap-2"
            aria-label="Reply"
          >
            <BsReply className=" w-6 h-6" />
            Reply
          </Button>
          {/* Upvote */}
          <VotesAnswers
            id={answer._id}
            upvote={answer.upvote}
            downvote={answer.downvote}
            isUpvoted={new Map(Object.entries(answer.isUpvoted))}
            isDownvoted={new Map(Object.entries(answer.isDownvoted))}
          />
        </div>
      )}
      {answer.replies.length > 0 && (
        <div className=" h-[1px] mb-2 bg-gray-300" />
      )}

      {answer.replies && answer.replies.length > 0 && (
        <div className="pl-4 md:pl-8 flex flex-col gap-4">
          {answer.replies.map((reply) => (
            <AnswerCard key={reply._id} answer={reply} />
          ))}
        </div>
      )}

      <AnswerReplyDialog
        id={answer._id}
        user={{
          username: answer.userId.username,
          profileImg: answer.userId.profileImg,
        }}
        isOpen={isReplyOpen}
        setIsOpen={setIsReplyOpen}
      />
    </section>
  );
};

export default AnswerCard;
