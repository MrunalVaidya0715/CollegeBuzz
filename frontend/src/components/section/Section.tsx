import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";
import TopQuestions from "./TopQuestions";
const Section = () => {
  return (
    <aside className="sticky top-[5rem] w-[30%] h-fit hidden md:flex flex-col gap-6">
      <Button
        className=" bg-blue-600 hover:bg-blue-800 gap-2"
        aria-label="Ask Question"
      >
        <IoMdAdd className=" w-5 h-5" />
        Ask Question
      </Button>
      <TopQuestions />
    </aside>
  );
};

export default Section;
