import { TopQuestion } from "@/components/section/TopQuestions";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { GoDash } from "react-icons/go";
import { Link } from "react-router-dom";
interface TQuesCardProps {
  index: number;
  tQues: TopQuestion;
}

const TopQuestionCard = ({ index, tQues }: TQuesCardProps) => {
  const vote = tQues.vote;
  return (
    <div className="w-full flex items-center justify-between gap-1">
      <p className=" font-medium text-sm mr-1">{index + 1}.</p>
      <Link to={`/posts/${tQues._id}`} className=" w-full">
        <div className="w-full line-clamp-1">
          <p className="cursor-pointer text-sm underline-offset-2 hover:underline hover:text-blue-500">
            {tQues.title}
          </p>
        </div>
      </Link>
      <div className=" flex items-center gap-1">
        <p className=" font-medium text-sm">{vote > 0 ? vote : vote * 1}</p>
        {vote > 0 ? (
          <TiArrowSortedUp className=" text-blue-600" />
        ) : vote < 0 ? (
          <TiArrowSortedDown className=" text-red-600" />
        ) : (
          <GoDash className="w-3 text-gray-600" />
        )}
      </div>
    </div>
  );
};

export default TopQuestionCard;
