import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Login from "../login/Login";

interface LoginDialogProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (arg: boolean) => void;
}

const LoginDialog = ({ isLoginOpen, setIsLoginOpen }: LoginDialogProps) => {
  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className=" max-w-[95%] sm:max-w-[450px] md:max-w-[550px] min-h-[250px] rounded-lg">
        <DialogHeader>
          <DialogTitle className=" text-center">Login to continue</DialogTitle>
          <DialogDescription className=" text-center">
            Please log in to continue connecting with your college peers
          </DialogDescription>
          <div className=" h-full flex flex-col justify-center">
            <Login setIsLoginOpen={setIsLoginOpen} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
