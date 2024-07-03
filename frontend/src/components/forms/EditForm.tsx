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
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";

const editFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title required" })
    .max(150, { message: "Max 150 characters are allowed" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .refine(
      (value) => {
        const strippedHtml = value.replace(/<[^>]+>/g, "");
        return strippedHtml.trim().length > 0;
      },
      { message: "Description is required." }
    ),
});

interface EditFormProps {
  eTitle: string;
  eDescription: string;
}
const EditForm = ({ eTitle, eDescription }: EditFormProps) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setIsEditQuesOpen } = useDialogStore();
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title: eTitle,
      description: eDescription,
    },
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    const { title, description } = values;
    try {
      const res = await apiRequest.put(`questions/edit/${id}`, {
        title,
        description,
      });
      if (res.data.message === "Question updated successfully") {
        queryClient.invalidateQueries({ queryKey: [`post.${id}`] });
        toast({ title: res.data.message });
        setIsEditQuesOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Couldn't Edit Question",
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
          name="title"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Question Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
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
          disabled={!form.formState.isValid || form.formState.isSubmitting || (eTitle === form.getValues().title && eDescription === form.getValues().description)}
          type="submit"
          className="mt-4 w-full disabled:opacity-70"
        >
          {form.formState.isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
