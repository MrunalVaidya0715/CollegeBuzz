import PostCard from "@/cards/PostCard";
import NoData from "@/components/queryStates/NoData";
import Retry from "@/components/queryStates/Retry";
import apiRequest from "@/lib/apiRequest";
import PostCardSkeleton from "@/skeletons/PostCardSkeleton";
import { useQuery } from "@tanstack/react-query";

interface UserId {
  _id: string;
  username: string;
  email: string;
  profileImg: string;
  role: string;
}
export interface Post {
  _id: string;
  userId: UserId;
  title: string;
  description: string;
  branch: string;
  category: string;
  upvote: number;
  isUpvoted: Map<string, boolean>;
  downvote: number;
  isDownvoted: Map<string, boolean>;
  report: number;
  reportedBy: string[];
  answers: string[];
  embedding?: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

const Posts = () => {
  const {
    data: posts,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      apiRequest.get("questions").then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="w-full flex flex-col gap-4">
      {isLoading || isRefetching ? (
        Array(3)
          .fill(null)
          .map((_, index) => <PostCardSkeleton key={index} />)
      ) : error ? (
        <Retry refetch={refetch} />
      ) : posts?.length === 0 ? (
        <NoData message="No Questions at the moment" />
      ) : (
        posts?.map((post) => <PostCard key={post._id} />)
      )}
    </div>
  );
};

export default Posts;
