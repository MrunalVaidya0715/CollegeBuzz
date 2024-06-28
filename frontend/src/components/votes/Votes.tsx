import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { MdLensBlur } from "react-icons/md";
import { useParams } from "react-router-dom";
import useAuthStore from "@/store/useAuth";
import useDialogStore from "@/store/useDialogStore";
import { Button } from "../ui/button";
import apiRequest from "@/lib/apiRequest";
import { useState } from "react";

interface VotesProps {
  upvote: number;
  downvote: number;
  isUpvoted?: Map<string, boolean>;
  isDownvoted?: Map<string, boolean>;
}

const Votes = ({ upvote, downvote, isUpvoted, isDownvoted }: VotesProps) => {
  const { id } = useParams();
  const { setIsLoginOpen } = useDialogStore();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const vote = upvote - downvote;
  const handleIsLogin = () => {
    setIsLoginOpen(true);
  };
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [isDownvoting, setIsDownvoting] = useState(false);
  const upvoteMutation = useMutation({
    mutationFn: async () => {
      setIsUpvoting(true);
      await apiRequest.put(`questions/upvote/${id}`);
    },
    onSuccess: () => {
      setIsUpvoting(false);
      queryClient.invalidateQueries({ queryKey: [`post.${id}`] });
    },
    onError: () => {
      setIsUpvoting(false);
      console.error("UV Error");
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: async () => {
      setIsDownvoting(true)
      await apiRequest.put(`questions/downvote/${id}`)
    },
    onSuccess: () => {
      setIsDownvoting(false)
      queryClient.invalidateQueries({ queryKey: [`post.${id}`] });
    },
    onError: () => {
      setIsDownvoting(false)
      console.error("DV Error");
    },
  });

  const handleUpvote = () => {
    if (user) {
      upvoteMutation.mutate();
    } else {
      handleIsLogin();
    }
  };

  const handleDownvote = () => {
    if (user) {
      downvoteMutation.mutate();
    } else {
      handleIsLogin();
    }
  };

  return (
    <section>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          disabled={isUpvoting || isDownvoting}
          className="group relative h-fit p-1 hover:bg-transparent rounded-full overflow-hidden"
          aria-label="Upvote"
          onClick={handleUpvote}
        >
          {isUpvoting && (
            <div className="z-[10] absolute w-full h-full animate-ping">
              <MdLensBlur className="w-full h-full text-blue-500 animate-pulse" />
            </div>
          )}
          {user && isUpvoted && isUpvoted.get(user._id) ? (
            <div className=" relative h-6 aspect-square overflow-hidden">
              <BiSolidUpvote className="absolute w-6 h-6 text-blue-500" />
            </div>
          ) : (
            <BiUpvote className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
          )}
        </Button>
        <p
          className={`font-bold text-lg ${
            vote > 0
              ? "text-blue-600"
              : vote < 0
              ? "text-red-600"
              : "text-gray-400"
          }`}
        >
          {vote > 0 ? vote : vote * -1}
        </p>
        <Button
          variant="ghost"
          disabled={isUpvoting || isDownvoting}
          className="group relative h-fit p-1 hover:bg-transparent rounded-full overflow-hidden"
          aria-label="Upvote"
          onClick={handleDownvote}
        >
          {isDownvoting && (
            <div className="z-[10] absolute w-full h-full animate-ping">
              <MdLensBlur className="w-full h-full text-red-500 animate-pulse" />
            </div>
          )}
          {user && isDownvoted && isDownvoted.get(user._id) ? (
            <div className=" relative h-6 aspect-square overflow-hidden">
              <BiSolidDownvote className="absolute w-6 h-6 text-red-500" />
            </div>
          ) : (
            <BiDownvote className="w-6 h-6 text-gray-400 group-hover:text-red-500" />
          )}
        </Button>
      </div>
    </section>
  );
};

export default Votes;
