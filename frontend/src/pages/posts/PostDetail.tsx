import { MdCircle } from "react-icons/md";
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
import { Post } from "./Posts";
import { Link, useParams } from "react-router-dom";
import apiRequest from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";
import PostDetailSkeleton from "@/components/skeletons/PostDetailSkeleton";
import Retry from "@/components/queryStates/Retry";
import { TimeAgo, getColor } from "@/lib/utils";
import useAuthStore from "@/store/useAuth";
import DOMPurify from "dompurify";
import Votes from "@/components/votes/Votes";
import useDialogStore from "@/store/useDialogStore";
import AnswerDialog from "@/components/dialogs/AnswerDialog";
import EditDialog from "@/components/dialogs/EditDialog";

const PostDetail = () => {
  const { id } = useParams();
  const { setIsAnsQuesOpen, setIsLoginOpen, setIsEditQuesOpen } = useDialogStore();
  const user = useAuthStore((state) => state.user);
  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useQuery<Post>({
    queryKey: [`post.${id}`],
    queryFn: () =>
      apiRequest.get(`questions/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const sanitizedDescription = DOMPurify.sanitize(post?.description || "");

  return (
    <div className="pt-2 w-full flex flex-col gap-4">
      {isLoading ? (
        <PostDetailSkeleton />
      ) : error ? (
        <Retry refetch={refetch} />
      ) : (
        <section className="p-4 w-full flex flex-col gap-2 bg-white border-1 border-gray-300">
          {/* User, Action */}
          <div className="pb-2 flex items-center justify-between  gap-2  border-b-1 border-gray-200">
            {/* User */}
            <div className=" flex items-center gap-2">
              <Link to={`/profile/${post?.userId._id}`}>
                <div className="group  flex items-center gap-2">
                  <div className=" w-[30px] aspect-square overflow-hidden bottom-1 border-gray-200 rounded-full">
                    <img
                      className=" w-full h-full object-cover object-center"
                      src={post?.userId.profileImg || "/assets/no-profile.png"}
                      alt={post?.userId.username}
                    />
                  </div>
                  <h3 className=" text-blue-500 text-sm font-medium underline-offset-2 group-hover:underline">
                    {user?._id === post?.userId._id
                      ? "You"
                      : post?.userId.username}
                  </h3>
                </div>
              </Link>
              <MdCircle className=" w-2 h-2 text-gray-300" />
              {post?.createdAt && (
                <p className=" text-gray-500 text-sm">
                  {TimeAgo(post?.createdAt)}
                </p>
              )}
            </div>
            {/* Action */}
            <Popover open={isActionsOpen} onOpenChange={setIsActionsOpen}>
              <PopoverTrigger>
                <div
                  className={`cursor-pointer w-fit aspect-square ${
                    isActionsOpen
                      ? "text-black bg-gray-200/80"
                      : "text-gray-400"
                  }  hover:text-black  rounded-full  `}
                >
                  <IoEllipsisVerticalSharp className=" w-6 h-6 transition-colors duration-200 ease-in-out" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="absolute -right-1 flex flex-col gap-3 max-w-fit">
                {user?._id === post?.userId._id ? (
                  <>
                    <div onClick={()=>setIsEditQuesOpen(true)} className="cursor-pointer flex items-center gap-4 text-gray-400 hover:text-black">
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
          {/* Edit Dialog & Delete Action */}
          <EditDialog eTitle={post?.title || ""} eDescription={post?.description || ""}  />
          {/* Category & Title */}
          <div className=" space-y-1 ">
            <div
              className="capitalize px-4 py-1 w-fit bg-orange-400  rounded-full"
              style={{
                backgroundColor: `${
                  post?.category ? getColor(post?.category) : "gold"
                }`,
              }}
            >
              <h4 className=" text-sm text-white font-medium">
                {post?.category}
              </h4>
            </div>
            <h1 className=" text-lg font-[600]">{post?.title}</h1>
          </div>
          {/* Description */}
          <div className="w-full p-2 border-1 border-gray-200  ">
            <div
              className="w-full max-w-full prose leading-6 -space-y-0  prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-h3:font-medium prose-a:text-sm prose-a:text-blue-500 prose-a:hover:text-blue-800 prose-a:hover:underline "
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></div>
          </div>
          {/* Upvote and Answer */}
          <div className="mt-2 w-full flex items-center justify-between gap-2">
            {/* Upvote */}
            <Votes
              upvote={post?.upvote || 0}
              downvote={post?.downvote || 0}
              isUpvoted={new Map(Object.entries(post?.isUpvoted || {}))}
              isDownvoted={new Map(Object.entries(post?.isDownvoted || {}))}
            />
            <Button
              onClick={user ? () => setIsAnsQuesOpen(true) : ()=> setIsLoginOpen(true) }
              variant={"outline"}
              aria-label="Add Answer"
              className=" text-gray-600 border-gray-400 hover:border-gray-500"
            >
              Answer
            </Button>
            {post && <AnswerDialog title={post.title} user={{username: post.userId.username, profileImg: post.userId.profileImg}} date={post.createdAt} />}
          </div>
        </section>
      )}

      <Answers />
    </div>
  );
};

export default PostDetail;
