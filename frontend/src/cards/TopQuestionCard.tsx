import { TiArrowSortedUp } from "react-icons/ti";
const TopQuestionCard = () => {
  return (
    <div className=" flex items-center gap-1">
      <p className=" font-medium text-sm mr-1">1.</p>
      <div className=" col-span-4 line-clamp-1">
        <p className="cursor-pointer text-sm underline-offset-2 hover:underline hover:text-blue-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          facilis assumenda earum repellat iusto impedit inventore sequi
          officiis et repudiandae.
        </p>
      </div>
      <div className="relative flex flex-col items-center">
        <TiArrowSortedUp className="absolute -top-[50%] text-blue-500" />
        <p className=" font-medium text-sm">4</p>
      </div>
    </div>
  );
};

export default TopQuestionCard;
