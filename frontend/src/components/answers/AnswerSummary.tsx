import { BsStars } from "react-icons/bs";
import { Answer } from "./Answers";
import { useEffect, useState } from "react";
import apiRequest from "@/lib/apiRequest";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

interface AnswerSummaryProps {
  answers: Answer[];
}

const AnswerSummary = ({ answers }: AnswerSummaryProps) => {
  const { id } = useParams();
  const [answerSummary, setAnswerSummary] = useState<string>("");
  const [ansCount, setAnsCount] = useState(0);

  useEffect(() => {
    if (!answers) return;
    const totalAnswers = answers.reduce((count, ans) => {
      count++;
      count += ans.replies.length;
      return count;
    }, 0);

    setAnsCount(totalAnswers);

    if (totalAnswers >= 2) {
      const conAns = answers.flatMap((ans) => [
        ans.content.replace(/<[^>]+>/g, ""),
        ...ans.replies.map((rep) => rep.content.replace(/<[^>]+>/g, "")),
      ]);
      const joinedAnswers = conAns.join(", ");

      const getAnswerSummary = async () => {
        try {
          const res = await apiRequest.post("answers/answer-summary", {
            answers: joinedAnswers,
          });
          setAnswerSummary(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      getAnswerSummary();
    }
  }, [answers, id]);
  return (
    ansCount >= 2 && (
      <article className="mt-2 md:mt-4 w-full flex flex-col gap-2">
        <div
          className={`flex gap-2 items-center ${
            answerSummary ? "animate-none" : "animate-pulse"
          }`}
        >
          <h2 className=" text-xs md:text-sm bg-gradient-to-r from-blue-700 via-pink-600 to-red-800 bg-clip-text text-transparent">
            {answerSummary
              ? "AI-generated Answer Summary"
              : "Summarizing Answers"}
          </h2>
          <BsStars className=" w-4 md:w-5  h-4 md:h-5 text-blue-600 " />
        </div>
        {answerSummary ? (
          <p className=" leading-5  text-gray-800 pb-2">{answerSummary}</p>
        ) : (
          <div className=" space-y-1">
            <Skeleton className=" w-full h-5 bg-gray-600/10" />
            <Skeleton className=" w-full h-5 bg-gray-600/10" />
          </div>
        )}
      </article>
    )
  );
};

export default AnswerSummary;
