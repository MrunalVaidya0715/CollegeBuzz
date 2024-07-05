import { Skeleton } from "../ui/skeleton";

const ProfileAnsSkeleton = () => {
  return (
    <div className=" p-4 w-full min-h-[100px] flex flex-col gap-2 bg-white border-1 border-gray-200">
      <Skeleton className=" h-8 w-full" />
      <Skeleton className=" h-8 w-full" />
      <Skeleton className=" h-8 w-1/4" />
    </div>
  );
};

export default ProfileAnsSkeleton;
