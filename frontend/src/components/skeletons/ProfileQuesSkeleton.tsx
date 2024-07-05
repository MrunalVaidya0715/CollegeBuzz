import { Skeleton } from "../ui/skeleton";

const ProfileQuesSkeleton = () => {
  return (
    <div className=" p-4 w-full min-h-[120px] flex flex-col gap-2 bg-white border-1 border-gray-200">
      <div className="w-full flex items-center justify-between">
        <Skeleton className=" h-6 w-1/4" />
        <Skeleton className=" h-6 w-1/4" />
      </div>
      <Skeleton className=" h-8 w-full" />
      <Skeleton className=" h-8 w-1/4" />
    </div>
  );
};

export default ProfileQuesSkeleton;
