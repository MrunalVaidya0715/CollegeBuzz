import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import useDialogStore from "@/store/useDialogStore";
import { useNavigate } from "react-router-dom";

export interface SimilarQues {
  _id: string;
  title: string;
  description: string;
  score: number;
}

interface SimilarQuesDrawerProps {
  similarQues: SimilarQues[];
  onAskQuestion: () => void;
}


const SimilarQuestionsDrawer = ({ similarQues, onAskQuestion }: SimilarQuesDrawerProps) => {
  const isDrawerOpen = useDialogStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useDialogStore((state) => state.setIsDrawerOpen);
  const setIsAskOpen = useDialogStore((state) => state.setIsAskQuesOpen);
  const navigate = useNavigate();
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="mx-auto w-full max-w-[550px]">
        <DrawerHeader>
          <DrawerTitle className=" text-center">
            Similar Questions found
          </DrawerTitle>
          <DrawerDescription className=" text-center">
            You can view existing questions without raising new questions
          </DrawerDescription>
        </DrawerHeader>
        <ul className="p-2 w-full flex flex-col gap-2">
          {similarQues.map((ques, index) => (
            <li
              onClick={() => {
                setDrawerOpen(false);
                setIsAskOpen(false);
                navigate(`/posts/${ques._id}`);
              }}
              key={ques._id}
              className="relative cursor-pointer pt-6 p-4 flex gap-2 border-1 border-gray-300 hover:border-gray-800"
            >
              <div className=" font-medium">{index + 1}.</div>
              <div className="  flex flex-col gap-2">
                <h2 className=" font-medium">{ques.title}</h2>
              </div>
              <p className=" absolute right-1 top-1 text-xs md:text-sm font-medium text-orange-600">
                {(ques.score * 100).toFixed((2))}% Match
              </p>
            </li>
          ))}
        </ul>
        <DrawerFooter className=" w-full grid grid-cols-1 md:grid-cols-2">
          <Button
            onClick={() => {
              onAskQuestion();
              setDrawerOpen(false);
            }}
          >
            Ask Question
          </Button>

          <Button
            onClick={() => {
              setDrawerOpen(false);
              setIsAskOpen(false);
            }}
            variant="outline"
            className="w-full"
          >
            Don't Ask
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SimilarQuestionsDrawer;
