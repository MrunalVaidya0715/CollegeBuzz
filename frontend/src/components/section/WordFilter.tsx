import { BsInfoCircleFill } from "react-icons/bs";
import TooltipUtil from "../ui/TooltipUtil";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useState } from "react";
const WordFilter = () => {
  const [isManage, setIsManage] = useState(false);
  return (
    <section className=" w-full flex flex-col gap-4">
      <TooltipUtil content="Add Profine Words for filtering and fostering better community">
        <div className=" flex items-center justify-center gap-2">
          <h2 className=" text-center font-medium">Word Filter</h2>
          <BsInfoCircleFill className=" w-4 h-4" />
        </div>
      </TooltipUtil>
      <div className=" flex flex-col items-center gap-2">
        {isManage ? (
          <div className="w-full max-h-[100px] flex flex-col overflow-y-auto scroll-smooth">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-10 pl-3 p-2 flex bg-white border-b-1 border-gray-200 last:border-b-0"
                >
                  <p className="  w-full text-sm">Word</p>
                  <Button
                    className="h-7 w-fit aspect-square p-0 bg-white hover:bg-white/50 text-red-600 border-1 border-red-200 rounded-full"
                    aria-label={`Remove Word${index}`}
                  >
                    <IoMdRemove className=" w-5 h-5" />
                  </Button>
                </div>
              ))}
          </div>
        ) : (
          <div className=" flex items-center">
            <Input className="border-gray-200 rounded-l-md rounded-r-none focus-visible:ring-1" />
            <Button
              className=" w-fit aspect-square p-0 bg-blue-600 hover:bg-blue-800 rounded-r-md rounded-l-none"
              aria-label="Add Word"
            >
              <IoMdAdd className=" w-5 h-5" />
            </Button>
          </div>
        )}

        <p
          onClick={() => setIsManage((prev) => !prev)}
          className="select-none cursor-pointer text-blue-500 underline-offset-2 hover:underline"
        >
          {isManage ? "Add Words" : "Manage"}
        </p>
      </div>
    </section>
  );
};

export default WordFilter;
