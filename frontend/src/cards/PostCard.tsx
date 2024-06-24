import { MdArrowUpward, MdArrowDownward, MdCircle } from "react-icons/md";
const PostCard = () => {
  return (
    <section className="px-4 py-2 w-full  flex gap-3 bg-white border-1 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 ease-in-out">
      {/* Upvotes */}
      <div className="px-1 flex flex-col items-center gap-1">
        <MdArrowUpward className=" w-5 h-5 text-gray-400" />
        <p className=" font-bold text-sm">5</p>
        <MdArrowDownward className=" w-5 h-5 text-gray-400" />
      </div>
      {/* Details */}
      <div className=" w-full flex flex-col gap-2 justify-between">
        {/* Category and Title */}
        <div className=" space-y-1 ">
          <div className="px-4 py-1 w-fit bg-orange-400  rounded-full">
            <h2 className=" text-sm text-white font-medium">Technology</h2>
          </div>
          <h1 className=" text-lg font-[600]">
            How can I improve my coding skills as a computer science student?
          </h1>
        </div>
        {/* Description */}
        <div>
          <p className=" line-clamp-2 text-gray-800">
            I'm from computer science branch and I want to become a better
            programmer. Any tips for practicing and learning new programming
            languages?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, perferendis.
          </p>
        </div>
        {/* User */}
        <div className=" pt-4  pb-2 border-t-1 border-gray-200 flex items-center gap-2">
          <div className=" flex items-center gap-2">
            <div className=" w-[30px] aspect-square overflow-hidden bottom-1 border-gray-200">
              <img className=" w-full h-full object-cover object-center" src="/assets/no-profile.png" alt="ProfilePic" />
            </div>
            <h2 className=" text-blue-500 text-sm font-medium">Mrunal Vaidya</h2>
          </div>
          <MdCircle className=" w-2 h-2 text-gray-300"/>
          <p className=" text-gray-500 text-sm">1 Month ago</p>
        </div>
      </div>
    </section>
  );
};

export default PostCard;
