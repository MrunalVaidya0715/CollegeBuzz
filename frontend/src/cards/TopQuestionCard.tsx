import { IoArrowUp } from "react-icons/io5";
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
      <div className=" flex items-center">
        <p className=" font-medium text-sm">4</p>
        <IoArrowUp className=" text-blue-500" />
      </div>
    </div>
  );
};

export default TopQuestionCard;
