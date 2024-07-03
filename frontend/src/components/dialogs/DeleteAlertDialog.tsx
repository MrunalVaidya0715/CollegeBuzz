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
import useDialogStore from "@/store/useDialogStore";
import { useQueryClient } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";

interface DeleteAlertDialogProps {
  isDeleteAnswer?: boolean;
}

const DeleteAlertDialog = ({ isDeleteAnswer }: DeleteAlertDialogProps) => {
  const { isDeleteQuesOpen, setIsDeleteQuesOpen } = useDialogStore();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const deleteQues = async () => {
    try {
      const res = await apiRequest.delete(`questions/delete/${id}`);
      if (res.data.message === "Question deleted successfully") {
        queryClient.invalidateQueries({ queryKey: [`posts`] });
        navigate("/");
        toast({ title: res.data.message });
      } else {
        toast({
          variant: "destructive",
          title: "Couldn't Delete Question",
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
  };
  async function handleDeleteQuestion() {
    if (isDeleteAnswer) {
      console.log("Delete Answer");
    } else {
      deleteQues();
    }
  }
  return (
    <AlertDialog open={isDeleteQuesOpen} onOpenChange={setIsDeleteQuesOpen}>
      <AlertDialogContent className="w-[95%] max-w-[550px] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-center">
            This action cannot be undone. This will permanently delete your
            {isDeleteAnswer ? " Answer" : " Question"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=" w-full flex-col gap-2">
          <AlertDialogCancel className=" w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteQuestion}
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

export default DeleteAlertDialog;
