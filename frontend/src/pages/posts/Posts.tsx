import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PostCard from "@/cards/PostCard";
import NoData from "@/components/queryStates/NoData";
import Retry from "@/components/queryStates/Retry";
import apiRequest from "@/lib/apiRequest";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import useQuestionFilterStore from "@/store/useFilterSortStore";
import { LucideLoaderCircle } from "lucide-react";

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
  reportedBy: { userId: string; reason: string }[];
  answers: string[];
  embedding?: number[];
  createdAt: string;
  updatedAt: string;
}

interface PostFetched {
  questions: Post[];
  totalPages: number;
  currentPage: number;
}

const Posts = () => {
  const { category, sortBy } = useQuestionFilterStore();
  const catQuery = category;
  const sortQuery = sortBy;
  const { ref, inView } = useInView({ threshold: 1 });
  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await apiRequest.get(
      `questions?category=${catQuery}&sortBy=${sortQuery}&page=${pageParam}`
    );
    return res.data as PostFetched;
  };
  const {
    data,
    isLoading,
    isRefetching,
    isError,
    refetch,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });
  useEffect(() => {
    refetch();
  }, [catQuery, sortQuery, refetch]);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const posts = isSuccess ? data.pages.flatMap((page) => page.questions) : [];

  return (
    <div className="w-full flex flex-col gap-4">
      {isLoading || isRefetching ? (
        Array(3)
          .fill(null)
          .map((_, index) => <PostCardSkeleton key={index} />)
      ) : isError ? (
        <Retry refetch={refetch} />
      ) : posts.length === 0 ? (
        <NoData message="No Questions at the moment" />
      ) : (
        <div className="w-full flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          {hasNextPage && (
            <div ref={ref} className=" mx-auto my-6">
              {isFetchingNextPage && (
                <LucideLoaderCircle className=" w-5 h-5 text-blue-600 animate-spin" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
