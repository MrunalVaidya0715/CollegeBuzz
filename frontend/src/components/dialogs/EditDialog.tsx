import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useDialogStore from "@/store/useDialogStore";
import EditForm from "../forms/EditForm";
import { AiOutlineClose } from "react-icons/ai";

interface EditDialogProps {
  eTitle: string;
  eDescription: string;
}

const EditDialog = ({ eTitle, eDescription }: EditDialogProps) => {
  const { isEditQuesOpen, setIsEditQuesOpen } = useDialogStore();
  return (
    <AlertDialog open={isEditQuesOpen} onOpenChange={setIsEditQuesOpen}>
      <AlertDialogContent className=" pt-6 pb-4 w-[95%] max-w-[550px] min-h-[300px] max-h-[calc(100dvh-100px)] flex flex-col rounded-lg overflow-y-auto">
        <AlertDialogCancel className=" absolute right-2 top-0 md:top-2 w-fit bg-transparent border-transparent hover:border-gray-300 ">
          <AiOutlineClose className=" w-5 h-5" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center leading-6">
            Edit Question
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-center">
            You can only edit the title and description of your question.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <EditForm eTitle={eTitle} eDescription={eDescription} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditDialog;
