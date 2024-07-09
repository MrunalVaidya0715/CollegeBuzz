import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AiOutlineClose } from "react-icons/ai";
import ReportForm from "../forms/ReportForm";

interface ReportDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const ReportDialog = ({ isOpen, setIsOpen }: ReportDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="pt-6 pb-4 w-[95%] max-w-[550px] h-full min-h-[300px] max-h-[350px] flex flex-col rounded-lg overflow-y-auto">
        <AlertDialogCancel className="absolute right-2 top-0 md:top-2 w-fit bg-transparent border-transparent hover:border-gray-300">
          <AiOutlineClose className="w-5 h-5" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center leading-6">
            Report Question
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Please mention the reason for reporting this Question
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" w-full h-full flex items-center justify-center">
          <ReportForm setIsOpen={setIsOpen} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReportDialog;
