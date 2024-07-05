import { ProfileAnswer } from "@/pages/profile/Profile";
import DOMPurify from "dompurify";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";

interface ProfileAnsCard {
  answer: ProfileAnswer;
}

const ProfileAnsCard = ({ answer }: ProfileAnsCard) => {
  const sanitizedContent = DOMPurify.sanitize(answer.content);
  const vote = answer.upvote - answer.downvote;
  return (
    <Link to={`/posts/${answer.questionId._id}`}>
      <section className="p-4 w-full flex flex-col gap-2 bg-white border-1 border-gray-200 hover:border-gray-500 transition-all duration-200 ease-in-out">
        <p className="line-clamp-1 leading-5 font-semibold lg:text-lg text-gray-800">
          {answer.questionId.title}
        </p>
        <div className="w-full p-2 border-1 border-gray-200  ">
          <div
            className="w-full max-w-full prose line-clamp-2 leading-6 -space-y-0  prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-h3:font-medium prose-a:text-sm prose-a:text-blue-500 prose-a:hover:text-blue-800 prose-a:hover:underline "
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
        </div>
        <div className=" px-2 py-1 w-fit flex items-center gap-3 border-1 border-gray-300 rounded-full ">
          <BiUpvote className={`${vote > 0 ? "text-blue-600":" text-gray-400"} w-5 h-5 `}/>
          <span className={` ${vote > 0 ? "text-blue-700": vote < 0 ? " text-red-700": "text-gray-400"} text-sm lg:text-base font-semibold`}>{vote < 0 ? vote * -1 : vote}</span>
          <BiDownvote className={`${vote < 0 ? "text-red-500":" text-gray-400"} w-5 h-5 `}/>
        </div>
      </section>
    </Link>
  );
};

export default ProfileAnsCard;
