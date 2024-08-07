import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="p-4 w-full  flex gap-3 bg-white border-1 border-gray-200">
      <div className=" w-6">
        <Skeleton className="h-1/3 w-full" />
      </div>
      <div className=" w-full flex flex-col gap-2 justify-between">
        <div className=" space-y-2 ">
          <Skeleton className="h-8 w-1/3" />
        </div>
        <div className=" mt-2">
          <Skeleton className="h-16 w-full" />
        </div>
        <div className=" pt-2 border-t-1 border-gray-200 flex items-center gap-2">
          <Skeleton className="h-7 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
