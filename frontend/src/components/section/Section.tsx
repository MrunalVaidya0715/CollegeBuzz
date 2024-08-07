import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import TopQuestions from "./TopQuestions";
import { useState } from "react";
import QuestionDialog from "../dialogs/QuestionDialog";
import useAuthStore from "@/store/useAuth";
import useDialogStore from "@/store/useDialogStore";
const Section = () => {
  const user = useAuthStore((state) => state.user);
  const setIsLoginOpen = useDialogStore((state) => state.setIsLoginOpen);
  const [showSection, setShowSection] = useState(false);
  const isAskQuesOpen = useDialogStore((state) => state.isAskQuesOpen);
  const setIsAskQuesOpen = useDialogStore((state) => state.setIsAskQuesOpen);
  const handleAskQuestion = () => {
    if (!user) {
      setIsLoginOpen(true);
    } else {
      setIsAskQuesOpen(true);
      setShowSection(false);
    }
  };
  return (
    <aside
      className={`fixed z-[100] md:z-[0] ${
        showSection ? " translate-x-0" : "translate-x-[100%] md:translate-x-0"
      } top-20 right-0 p-4 md:p-0 md:sticky md:top-[5rem] w-[95%] max-w-[350px] md:w-[30%] h-fit flex flex-col gap-6 bg-white md:bg-transparent border-1 border-gray-300 md:border-transparent transition-transform duration-300 ease-in-out`}
    >
      <div
        onClick={() => setShowSection((prev) => !prev)}
        className={`${
          showSection
            ? "opacity-100"
            : "opacity-50 -translate-x-3 hover:opacity-100"
        } cursor-pointer block md:hidden absolute top-14 -left-4 p-1 bg-blue-600 text-white rounded-full transition-transform duration-300 ease-in-out `}
      >
        <MdKeyboardArrowLeft
          className={`${
            showSection ? "rotate-180" : "rotate-0"
          } w-7 h-7 transition-transform duration-300 ease-in-out `}
        />
      </div>
      <Button
        onClick={handleAskQuestion}
        className="hidden md:flex bg-blue-600 hover:bg-blue-800 gap-2"
        aria-label="Ask Question"
      >
        <IoMdAdd className=" w-5 h-5" />
        Ask Question
      </Button>
      <QuestionDialog
        isAskQuesOpen={isAskQuesOpen}
        setIsAskQuesOpen={setIsAskQuesOpen}
      />

      <TopQuestions />
    </aside>
  );
};

export default Section;
