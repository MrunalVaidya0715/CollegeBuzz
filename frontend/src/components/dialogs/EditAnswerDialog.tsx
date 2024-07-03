import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AiOutlineClose } from "react-icons/ai";
import EditAnswerForm from "../forms/EditAnswerForm";
import { Answer } from "../answers/Answers";

interface EditAnswerDialogProps {
  answer: Answer;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EditAnswerDialog = ({
  answer,
  isOpen,
  setIsOpen,
}: EditAnswerDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="pt-6 pb-4 w-[95%] max-w-[550px] min-h-[300px] max-h-[calc(100dvh-100px)] flex flex-col rounded-lg overflow-y-auto">
        <AlertDialogCancel className="absolute right-2 top-0 md:top-2 w-fit bg-transparent border-transparent hover:border-gray-300">
          <AiOutlineClose className="w-5 h-5" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center leading-6">
            Edit Answer
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Update your answer
          </AlertDialogDescription>
        </AlertDialogHeader>
        <EditAnswerForm id={answer._id} eContent={answer.content} setIsOpen={setIsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditAnswerDialog;
