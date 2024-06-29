import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "../ui/use-toast";
import useDialogStore from "@/store/useDialogStore";
import apiRequest from "@/lib/apiRequest";
import { useParams } from "react-router-dom";
const ansformSchema = z.object({
  answer: z
    .string()
    .min(1, { message: "Answer is required" })
    .refine(
      (value) => {
        const strippedHtml = value.replace(/<[^>]+>/g, "");
        return strippedHtml.trim().length > 0;
      },
      { message: "Answer is required." }
    ),
});

export type AnswerFormSchema = z.infer<typeof ansformSchema>;
const AnswerForm = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { setIsAnsQuesOpen } = useDialogStore();
  const form = useForm<z.infer<typeof ansformSchema>>({
    resolver: zodResolver(ansformSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ansformSchema>) {
    try {
      await apiRequest.post(`answers/add-answer/${id}`, {
        content: values.answer
      });
      toast({ title: "Answer uploaded Successfully" });
      setIsAnsQuesOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again!",
      });
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4"
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className=" hidden">Description</FormLabel>
              <FormControl>
                <ReactQuill {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          type="submit"
          className="mt-4 w-full disabled:opacity-70"
        >
          Answer
        </Button>
      </form>
    </Form>
  );
};

export default AnswerForm;
