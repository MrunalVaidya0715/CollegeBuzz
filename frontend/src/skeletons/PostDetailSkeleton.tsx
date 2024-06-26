import { Skeleton } from "@/components/ui/skeleton";

const PostDetailSkeleton = () => {
  return (
    <div className="p-4 flex flex-col gap-2 bg-white border-1 border-gray-300">
      <div className=" w-full pb-2 border-b-1 border-gray-200">
        <Skeleton className=" h-6 w-1/2" />
      </div>
      <div className=" space-y-2">
        <Skeleton className=" h-6 w-1/3" />
        <Skeleton className=" h-6 w-full" />
      </div>
      <div className=" mt-2">
        <Skeleton className=" h-28 w-full" />
      </div>
      {/* <div className="mt-4 w-full flex items-center justify-between">
        <Skeleton className=" h-8 w-1/4" />
        <Skeleton className=" h-8 w-1/4" />
      </div> */}
    </div>
  );
};

export default PostDetailSkeleton;
