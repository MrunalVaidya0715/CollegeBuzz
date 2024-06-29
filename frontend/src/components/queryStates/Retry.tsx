import { BsArrowCounterclockwise } from "react-icons/bs";
import { Button } from "../ui/button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface RetryProps {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<unknown[] | unknown, Error>>;
  className?: string;
}

const Retry = ({ refetch, className }: RetryProps) => {
  return (
    <section
      className={`${
        className ? className : "min-h-[400px]"
      } w-full  flex flex-col items-center justify-center gap-2`}
    >
      <p className=" font-medium text-gray-500">Something went wrong</p>
      <Button
        onClick={() => refetch()}
        className=" gap-2 hover:text-yellow-400"
      >
        Retry
        <BsArrowCounterclockwise className=" w-5 h-5" />
      </Button>
    </section>
  );
};

export default Retry;
