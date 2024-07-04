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
import apiRequest from "@/lib/apiRequest";
import { useQueryClient } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";

interface DeleteAnswerAlertProps {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DeleteAnswerAlert = ({id, isOpen, setIsOpen }: DeleteAnswerAlertProps) => {
  const { id: quesId } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  async function handleDeleteAnswer() {
    try {
      const res = await apiRequest.delete(`answers/delete/${id}`);
      if (res.data.message === "Answer deleted successfully") {
        queryClient.invalidateQueries({ queryKey: [`answers.${quesId}`] });
        toast({ title: res.data.message });
      } else {
        toast({
          variant: "destructive",
          title: "Couldn't Delete Answer",
          description: "Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again.",
      });
      console.error(error);
    }
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="w-[95%] max-w-[550px] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-center">
            This action cannot be undone. This will permanently delete your
            Answer
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=" w-full flex-col gap-2">
          <AlertDialogCancel className=" w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAnswer}
            className="w-full gap-2 bg-red-600 hover:bg-red-700"
          >
            Delete
            <RiDeleteBin6Line className=" w-5 h-5" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAnswerAlert;
