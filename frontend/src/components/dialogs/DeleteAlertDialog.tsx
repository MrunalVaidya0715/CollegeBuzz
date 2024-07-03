import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useDialogStore from "@/store/useDialogStore";
import { RiDeleteBin6Line } from "react-icons/ri";

interface DeleteAlertDialogProps {
  isDeleteAnswer?: boolean;
}

const DeleteAlertDialog = ({ isDeleteAnswer }: DeleteAlertDialogProps) => {
  const { isDeleteQuesOpen, setIsDeleteQuesOpen } = useDialogStore();
  return (
    <AlertDialog open={isDeleteQuesOpen} onOpenChange={setIsDeleteQuesOpen}>
      <AlertDialogContent className="w-[95%] max-w-[550px] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center">
            Are you absolutely sure?{" "}
            {isDeleteAnswer ? "Delete Answer" : "Delete Question"}
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-center">
            This action cannot be undone. This will permanently delete your
            Question
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=" w-full flex-col gap-2">
          <AlertDialogCancel className=" w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-full gap-2 bg-red-600 hover:bg-red-700">
            Delete
            <RiDeleteBin6Line className=" w-5 h-5" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
