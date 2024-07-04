import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AiOutlineClose } from "react-icons/ai";
import AnswerReplyForm from "../forms/AnswerReplyForm";

interface AnswerReplyDialogProps {
  id: string;
  user: {
    username: string;
    profileImg: string;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AnswerReplyDialog = ({
  id,
  user,
  isOpen,
  setIsOpen,
}: AnswerReplyDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className=" pt-6 pb-4 w-[95%] max-w-[550px] min-h-[300px] max-h-[calc(100dvh-100px)] flex flex-col justify-center rounded-lg overflow-y-auto">
        <AlertDialogCancel className=" absolute right-2 top-0 md:top-2 w-fit bg-transparent border-transparent hover:border-gray-300 ">
          <AiOutlineClose className=" w-5 h-5" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center text-base leading-6">
            <div className=" flex items-center justify-center gap-1">
              <p className=" text-gray-600">Replying to</p>
              <div className="ml-2 w-[30px] aspect-square rounded-full border-1 border-gray-400 overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={user.profileImg || "assets/no-profile.png"}
                  alt={user.username}
                />
              </div>
              <h3 className=" text-black">{user.username}</h3>
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AnswerReplyForm id={id} setIsOpen={setIsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AnswerReplyDialog;
