import PostCard from "@/cards/PostCard";
import NoData from "@/components/queryStates/NoData";
import Retry from "@/components/queryStates/Retry";
import apiRequest from "@/lib/apiRequest";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import useQuestionFilterStore from "@/store/useFilterSortStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect} from "react";
import { Post } from "../posts/Posts";
import useFilterBranchStore from "@/store/useFilterBranchStore";

const Contribute = () => {
  const { category, sortBy } = useQuestionFilterStore();
  const { branch } = useFilterBranchStore();
  const catQuery = category;
  const sortQuery =  sortBy;

  const {
    data: posts,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["contribute"],
    queryFn: () =>
      apiRequest
        .get(`questions/contribute?branch=${branch}&category=${catQuery}&sortBy=${sortQuery}`)
        .then((res) => {
          return res.data;
        }),
  });
  useEffect(() => {
    refetch();
  }, [catQuery, sortQuery, branch, refetch]);
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

export default Contribute;
