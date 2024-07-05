import { getColor } from "@/lib/utils";
import { ProfileQuestion } from "@/pages/profile/Profile";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { BiUpvote, BiDownvote } from "react-icons/bi";

interface ProfileQuesCardProps {
  question: ProfileQuestion;
}

const ProfileQuesCard = ({ question }: ProfileQuesCardProps) => {
    const vote = question.upvote - question.downvote;
  return (
    <Link to={`/posts/${question._id}`}>
      <section className="p-4 w-full flex flex-col gap-2 bg-white border-1 border-gray-200">
        <div className="w-full flex items-center justify-between gap-2">
          <div
            className="px-4 py-1 w-fit rounded-full"
            style={{ backgroundColor: `${getColor(question.category)}` }}
          >
            <h2 className="capitalize text-sm text-white font-medium">
              {question.category}
            </h2>
          </div>
          <p className=" text-xs lg:text-sm text-gray-700 font-medium">
            {format(question.createdAt, "dd-MM-yyyy")}
          </p>
        </div>
        <p className="leading-5 font-semibold lg:text-lg">{question.title}</p>
        <div className="mt-2 px-2 py-1 w-fit flex items-center gap-3 border-1 border-gray-300 rounded-full ">
          <BiUpvote className={`${vote > 0 ? "text-blue-600":" text-gray-400"} w-5 h-5 `}/>
          <span className={` ${vote > 0 ? "text-blue-700": vote < 0 ? " text-red-700": "text-gray-400"} text-sm lg:text-base font-semibold`}>{vote < 0 ? vote * -1 : vote}</span>
          <BiDownvote className={`${vote < 0 ? "text-red-500":" text-gray-400"} w-5 h-5 `}/>
        </div>
      </section>
    </Link>
  );
};

export default ProfileQuesCard;
