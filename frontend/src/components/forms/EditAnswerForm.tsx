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
import apiRequest from "@/lib/apiRequest";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const editFormSchema = z.object({
  content: z
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

interface EditAnswerFormProps {
  id: string;
  eContent: string;
  setIsOpen: (isOpen: boolean) => void;
}
const EditAnswerForm = ({ id, eContent, setIsOpen }: EditAnswerFormProps) => {
  const { id: quesId } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      content: eContent,
    },
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    const { content } = values;
    try {
      const res = await apiRequest.put(`answers/edit/${id}`, {
        content,
      });
      if (res.data.message === "Answer updated successfully") {
        queryClient.invalidateQueries({ queryKey: [`answers.${quesId}`] });
        toast({ title: res.data.message });
        setIsOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Couldn't Edit Answer",
          description: "Please try again.",
        });
      }
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
          name="content"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className=" hidden">Answer</FormLabel>
              <FormControl>
                <ReactQuill {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            eContent === form.getValues().content
          }
          type="submit"
          className="mt-4 w-full disabled:opacity-70"
        >
          {form.formState.isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default EditAnswerForm;
