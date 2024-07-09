import PostCard from "@/cards/PostCard";
import NoData from "@/components/queryStates/NoData";
import Retry from "@/components/queryStates/Retry";
import apiRequest from "@/lib/apiRequest";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import useQuestionFilterStore from "@/store/useFilterSortStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect} from "react";

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
  reportedBy: { userId: string, reason: string }[];
  answers: string[];
  embedding?: number[];
  createdAt: string;
  updatedAt: string;
}

const Posts = () => {
  const { category, sortBy } = useQuestionFilterStore();
  const catQuery = category;
  const sortQuery =  sortBy;

  const {
    data: posts,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      apiRequest
        .get(`questions?category=${catQuery}&sortBy=${sortQuery}`)
        .then((res) => {
          return res.data;
        }),
  });
  useEffect(() => {
    refetch();
  }, [catQuery, sortQuery, refetch]);
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
        posts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Posts;
