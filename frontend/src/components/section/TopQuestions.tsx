import TopQuestionCard from "@/cards/TopQuestionCard";

const TopQuestions = () => {
  return (
    <section className="pt-4 p-3 w-full h-auto flex flex-col gap-4 bg-white border-1 border-gray-300">
      <h2 className=" text-center font-medium">Top Questions</h2>
      <div className="w-full flex flex-col gap-4">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <TopQuestionCard key={index} />
          ))}
      </div>
    </section>
  );
};

export default TopQuestions;
