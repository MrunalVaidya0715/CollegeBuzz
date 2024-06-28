import { TimeAgo, getColor } from "@/lib/utils";
import { Post } from "@/pages/posts/Posts";
import DOMPurify from "dompurify";
import { MdArrowUpward, MdArrowDownward, MdCircle } from "react-icons/md";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const vote = post.upvote - post.downvote;
  const sanitizedDescription = DOMPurify.sanitize(post.description || "");
  return (
    <Link to={`/posts/${post._id}`}>
      <section className="p-4 w-full  flex gap-3 bg-white border-1 border-gray-200 hover:border-gray-300 hover:shadow-md delay-100 transition-all duration-300 ease-in-out">
        {/* Upvotes */}
        <div className="px-1 flex flex-col items-center gap-1">
          <MdArrowUpward
            className={` w-5 h-5 ${
              vote > 0 ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <p
            className={`font-bold text-sm ${
              vote > 0
                ? "text-blue-600"
                : vote < 0
                ? "text-red-600"
                : "text-gray-400"
            }`}
          >
            {vote > 0 ? vote : vote * -1}
          </p>
          <MdArrowDownward
            className={` w-5 h-5 ${
              vote < 0 ? " text-red-500" : "text-gray-400"
            }`}
          />
        </div>
        {/* Details */}
        <div className=" w-full flex flex-col gap-2 justify-between">
          {/* Category and Title */}
          <div className=" space-y-1 ">
            <div
              className="px-4 py-1 w-fit rounded-full"
              style={{ backgroundColor: `${getColor(post.category)}` }}
            >
              <h2 className="capitalize text-sm text-white font-medium">
                {post.category}
              </h2>
            </div>
            <h2 className="leading-5 text-lg font-[600]">{post.title}</h2>
          </div>
          {/* Description */}

          <div
            className="w-full max-w-full line-clamp-2 leading-6 prose -space-y-0  prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-h3:font-medium prose-a:text-sm prose-a:text-blue-500 prose-a:hover:text-blue-800 prose-a:hover:underline "
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          ></div>

          {/* User */}
          <div className=" pt-2 border-t-1 border-gray-200 flex items-center gap-2">
            <div className=" flex items-center gap-2">
              <div className=" w-[30px] aspect-square overflow-hidden bottom-1 border-gray-200 rounded-full">
                <img
                  className=" w-full h-full object-cover object-center"
                  src={post.userId.profileImg || "/assets/no-profile.png"}
                  alt={post.userId.username}
                />
              </div>
              <h3 className="hidden sm:block text-blue-500 text-sm font-medium">
                {post.userId.username}
              </h3>
            </div>
            <MdCircle className=" w-2 h-2 text-gray-300" />
            <p className=" text-gray-500 text-sm sm:text-sm">
              {TimeAgo(post.createdAt)}
            </p>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default PostCard;
