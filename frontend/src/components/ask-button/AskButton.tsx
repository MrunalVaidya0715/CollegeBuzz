import useAuthStore from "@/store/useAuth";
import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";
import useDialogStore from "@/store/useDialogStore";

const AskButton = () => {
  const user = useAuthStore((state) => state.user);
  const { isAskQuesOpen, setIsAskQuesOpen, isLoginOpen, setIsLoginOpen } = useDialogStore();
  const handleAskQuestion = () => {
    if(!user){
        setIsLoginOpen(true);
    }else{
        setIsAskQuesOpen(true);
    }
    
  };
  return (
    <Button
      onClick={handleAskQuestion}
      className={`fixed z-[100] right-4 bottom-10 ${isAskQuesOpen || isLoginOpen ? "opacity-0":"opacity-100"} md:hidden p-1 bg-blue-600 hover:bg-blue-800 hover:drop-shadow-lg w-[50px] h-[50px] rounded-full`}
      aria-label="Ask Question"
    >
      <IoMdAdd className=" w-7 h-7" />
    </Button>
  );
};

export default AskButton;
