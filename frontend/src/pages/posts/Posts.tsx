import PostCard from "@/cards/PostCard";

const Posts = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <PostCard key={index} />
        ))}
    </div>
  );
};

export default Posts;
