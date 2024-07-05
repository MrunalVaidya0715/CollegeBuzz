import PostCard from "@/cards/PostCard";
import NoData from "@/components/queryStates/NoData";
import Retry from "@/components/queryStates/Retry";
import apiRequest from "@/lib/apiRequest";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../posts/Posts";

const MyQuestions = () => {
  const {
    data: posts,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["userQuestions"],
    queryFn: () =>
      apiRequest.get(`questions/my-questions`).then((res) => {
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
        posts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default MyQuestions;
