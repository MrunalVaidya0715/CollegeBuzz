import { Skeleton } from "@/components/ui/skeleton";

const AnswersSkeleton = () => {
  return (
    <div className="p-4 w-full flex flex-col gap-2 bg-white border-1 border-gray-300">
      <div className="pb-2 flex items-center justify-between  gap-2  border-b-1 border-gray-200">
        <Skeleton className=" h-8 w-1/3" />
      </div>

      <Skeleton className="h-16 w-full" />

      <div className="mt-2 w-full flex items-center justify-end gap-2">
        <Skeleton className=" h-8 w-1/4" />
      </div>
    </div>
  );
};

export default AnswersSkeleton;
