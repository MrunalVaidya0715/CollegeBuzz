import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import useAuthStore from "@/store/useAuth";
import useDialogStore from "@/store/useDialogStore";
import { Button } from "../ui/button";
import apiRequest from "@/lib/apiRequest";

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

  const upvoteMutation = useMutation({
    mutationFn: async () => await apiRequest.put(`questions/upvote/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`post.${id}`] });
    },
    onError: () => {
      console.error("UV Error");
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: async () => await apiRequest.put(`questions/downvote/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`post.${id}`] });
    },
    onError: () => {
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
          className="group h-fit p-2 hover:bg-slate-100 rounded-full"
          aria-label="Upvote"
          onClick={handleUpvote}
        >
          {user && isUpvoted ? (
            <div>
              {isUpvoted.get(user._id) ? (
                <BiSolidUpvote className="w-6 h-6 text-blue-500" />
              ) : (
                <BiUpvote className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
              )}
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
          className="group h-fit p-2 hover:bg-slate-100 rounded-full"
          aria-label="Downvote"
          onClick={handleDownvote}
        >
          {user && isDownvoted ? (
            <div>
              {isDownvoted.get(user._id) ? (
                <BiSolidDownvote className="w-6 h-6 text-red-500" />
              ) : (
                <BiDownvote className="w-6 h-6 text-gray-400 group-hover:text-red-500" />
              )}
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
