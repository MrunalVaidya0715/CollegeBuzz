import { BsInfoCircleFill } from "react-icons/bs";
import TooltipUtil from "../ui/TooltipUtil";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";
const WordFilter = () => {
  return (
    <section className=" w-full flex flex-col gap-4">
      <TooltipUtil content="Add Profine Words for filtering and fostering better community">
        <div className=" flex items-center justify-center gap-2">
          <h2 className=" text-center font-medium">Word Filter</h2>
          <BsInfoCircleFill className=" w-4 h-4" />
        </div>
      </TooltipUtil>
      <div className=" flex flex-col items-center gap-2">
        <div className=" flex items-center">
          <Input className="border-gray-200 rounded-l-md rounded-r-none focus-visible:ring-1" />
          <Button
            className=" w-fit aspect-square p-0 bg-blue-600 hover:bg-blue-800 rounded-r-md rounded-l-none"
            aria-label="Add Word"
          >
            <IoMdAdd className=" w-5 h-5" />
          </Button>
        </div>
        <p className="cursor-pointer text-blue-500 underline-offset-2 hover:underline">Manage</p>
      </div>
    </section>
  );
};

export default WordFilter;
