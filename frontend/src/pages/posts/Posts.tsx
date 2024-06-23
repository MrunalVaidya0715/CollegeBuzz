const Posts = () => {
  return (
    <div className=" flex flex-col gap-4">
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="w-full h-[150px] border-1 border-gray-400"></div>
        ))}
    </div>
  );
};

export default Posts;
