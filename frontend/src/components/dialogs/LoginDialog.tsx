import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Login from "../login/Login";

interface LoginDialogProps{
    isLoginOpen: boolean;
    setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginDialog = ({ isLoginOpen, setIsLoginOpen}:LoginDialogProps) => {
  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className=" max-w-[95%] sm:max-w-[450px] md:max-w-[550px] rounded-lg">
        <DialogHeader>
          <DialogTitle className=" text-center">Login to continue</DialogTitle>
          <DialogDescription className=" text-center">
            Please log in to continue connecting with your college peers
          </DialogDescription>
          <Login setIsLoginOpen={setIsLoginOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
