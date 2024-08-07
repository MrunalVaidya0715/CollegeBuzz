import AnswerCard from "@/cards/AnswerCard";
import apiRequest from "@/lib/apiRequest";
import AnswersSkeleton from "@/components/skeletons/AnswersSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Retry from "../queryStates/Retry";
import NoData from "../queryStates/NoData";
import AnswerSummary from "./AnswerSummary";

export interface Answer {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profileImg: string;
  };
  questionId: string;
  content: string;
  parentAnswer: string | null;
  replies: Answer[];
  upvote: number;
  isUpvoted: Map<string, boolean>;
  downvote: number;
  isDownvoted: Map<string, boolean>;
  report: number;
  reportedBy: { userId: string; reason: string }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const Answers = () => {
  const { id } = useParams();
  const {
    data: answers,
    isLoading,
    error,
    refetch,
  } = useQuery<Answer[]>({
    queryKey: [`answers.${id}`],
    queryFn: () => apiRequest.get(`answers/${id}`).then((res) => res.data),
  });
  
  return (
    <>
      <AnswerSummary answers={answers || []} />
      <section className="w-full flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 2 }, (_, index) => (
            <AnswersSkeleton key={index} />
          ))
        ) : error ? (
          <Retry refetch={refetch} />
        ) : answers?.length === 0 ? (
          <NoData message="No Answers yet" className="min-h-[100px]" />
        ) : (
          answers?.map((answer) => (
            <AnswerCard key={answer._id} answer={answer} />
          ))
        )}
      </section>
    </>
  );
};

export default Answers;
