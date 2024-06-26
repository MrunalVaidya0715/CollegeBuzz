import { TimeAgo, getColor } from "@/lib/utils";
import { Post } from "@/pages/posts/Posts";
import { MdArrowUpward, MdArrowDownward, MdCircle } from "react-icons/md";
import { Link } from "react-router-dom";

interface PostCardProps{
  post: Post;
}

const PostCard = ({post}:PostCardProps) => {
  const vote = post.upvote - post.downvote
  return (
    <Link to={`/posts/${post._id}`}>
      <section className="px-4 py-2 w-full  flex gap-3 bg-white border-1 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 ease-in-out">
        {/* Upvotes */}
        <div className="px-1 flex flex-col items-center gap-1">
          <MdArrowUpward className={` w-5 h-5 ${vote > 0 ? "text-blue-500":"text-gray-400"}`} />
          <p className={`font-bold text-sm ${vote > 0 ? "text-blue-600": vote < 0 ? "text-red-600":"text-gray-400"}`}>{vote > 0 ? vote : (vote * -1)}</p>
          <MdArrowDownward className={` w-5 h-5 ${vote < 0 ?" text-red-500":"text-gray-400"}`} />
        </div>
        {/* Details */}
        <div className=" w-full flex flex-col gap-2 justify-between">
          {/* Category and Title */}
          <div className=" space-y-1 ">
            <div className="px-4 py-1 w-fit rounded-full" style={{backgroundColor: `${getColor(post.category)}`}}>
              <h2 className="capitalize text-sm text-white font-medium">{post.category}</h2>
            </div>
            <h2 className=" text-lg font-[600]">
              {post.title}
            </h2>
          </div>
          {/* Description */}
          <div>
            <p className=" line-clamp-2 text-gray-800">
             {post.description}
            </p>
          </div>
          {/* User */}
          <div className=" pt-4  pb-2 border-t-1 border-gray-200 flex items-center gap-2">
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
            <p className=" text-gray-500 text-sm sm:text-sm">{TimeAgo(post.createdAt)}</p>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default PostCard;
