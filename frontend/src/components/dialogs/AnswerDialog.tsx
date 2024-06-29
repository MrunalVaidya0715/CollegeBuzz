import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AiOutlineClose } from "react-icons/ai";
import AnswerForm from "../forms/AnswerForm";
import useDialogStore from "@/store/useDialogStore";
import { TimeAgo } from "@/lib/utils";
import { format } from "date-fns";

interface AnswerDialogProps {
  title: string;
  user: {
    username: string;
    profileImg: string;
  };
  date: string;
}

const AnswerDialog = ({ title, user, date }: AnswerDialogProps) => {
  const { isAnsQuesOpen, setIsAnsQuesOpen } = useDialogStore();
  return (
    <AlertDialog open={isAnsQuesOpen} onOpenChange={setIsAnsQuesOpen}>
      <AlertDialogContent className=" pt-6 pb-4 w-[95%] max-w-[550px] min-h-[300px] max-h-[calc(100dvh-100px)] flex flex-col rounded-lg overflow-y-auto">
        <AlertDialogCancel className=" absolute right-2 top-0 md:top-2 w-fit bg-transparent border-transparent hover:border-gray-300 ">
          <AiOutlineClose className=" w-5 h-5" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center leading-6">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-center">
            <div className=" flex items-center justify-center gap-1">
              <div className=" w-[30px] aspect-square rounded-full border-1 border-gray-400 overflow-hidden">
                <img
                    className="w-full h-full object-cover object-center"
                  src={user.profileImg || "assets/no-profile.png"}
                  alt={user.username}
                />
              </div>
              <h3 className=" text-black">{user.username}</h3>
              <span>on</span>
              
              <p>{format(date, "dd-MM-yyyy")} <span>{`(`}{TimeAgo(date)}{`)`}</span></p>
            </div> 
            
            
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AnswerForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AnswerDialog;
