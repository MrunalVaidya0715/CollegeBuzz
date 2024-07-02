import TopQuestionCard from "@/cards/TopQuestionCard";
import apiRequest from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import Retry from "../queryStates/Retry";

export interface TopQuestion {
  _id: string;
  title: string;
  vote: number;
}

const TopQuestions = () => {
  const {
    data: topQues,
    isLoading,
    error,
    refetch,
  } = useQuery<TopQuestion[]>({
    queryKey: ["topQuestions"],
    queryFn: () =>
      apiRequest.get(`questions/top-questions`).then((res) => {
        return res.data;
      }),
  });
  return (
    <section className="py-4 pl-3 pr-2 w-full h-auto flex flex-col gap-4 bg-white border-1 border-gray-200">
      <h2 className=" text-center font-medium">Top Questions</h2>
      <div className="w-full flex flex-col gap-4">
        {isLoading ? (
          Array(4)
            .fill(null)
            .map((_, index) => <Skeleton key={index} className=" w-full h-6" />)
        ) : error ? (
          <Retry refetch={refetch} className="min-h-[200px]" />
        ) : (
          topQues?.map((ques, index) => <TopQuestionCard key={ques._id} index={index} tQues={ques} />)
        )}
      </div>
    </section>
  );
};

export default TopQuestions;
