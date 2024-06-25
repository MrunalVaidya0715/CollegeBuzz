import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AiOutlineClose } from "react-icons/ai";
import AddAnswer from "../forms/AskQuestionForm";

interface AnswerDialogProps {
  isAddAnsOpen: boolean;
  setIsAddAnsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerDialog = ({ isAddAnsOpen, setIsAddAnsOpen }: AnswerDialogProps) => {
  return (
    <AlertDialog open={isAddAnsOpen} onOpenChange={setIsAddAnsOpen}>
      <AlertDialogContent className="py-4 w-[95%] max-w-[550px] min-h-[300px] max-h-[calc(100dvh-100px)] flex flex-col rounded-lg overflow-y-auto">
        <AlertDialogCancel className=" absolute right-2 top-0 md:top-2 w-fit border-transparent hover:border-gray-300 ">
          <AiOutlineClose className=" w-5 h-5" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center">
            Ask Question
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-center">
            Curious minds, cautious hearts! Let's ask questions with care to
            keep our community safe and sound.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddAnswer setIsAddAnsOpen={setIsAddAnsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AnswerDialog;
