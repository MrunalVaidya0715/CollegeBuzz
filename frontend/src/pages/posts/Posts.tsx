const Posts = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="w-full h-[150px] border-1 border-gray-400 bg-slate-100"></div>
        ))}
    </div>
  );
};

export default Posts;
