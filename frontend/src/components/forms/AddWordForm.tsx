import { IoMdAdd } from "react-icons/io";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
import { useToast } from "../ui/use-toast";
import apiRequest from "@/lib/apiRequest";
import { useQueryClient } from "@tanstack/react-query";

const addWordFormSchema = z.object({
  word: z
    .string()
    .min(1, { message: "Word is required" })
    .max(25, { message: "Max 25 chars" })
    .refine(
      (value) => {
        return value.trim().length > 0;
      },
      { message: "Word is required." }
    ),
});

const AddWordForm = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addWordFormSchema>>({
    resolver: zodResolver(addWordFormSchema),
    defaultValues: {
      word: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addWordFormSchema>) {
    const { word } = values;
    try {
      const res = await apiRequest.post(`badwords/add-word`, {
        word,
      });
      if (res.data.message === "Word added Successfully") {
        queryClient.invalidateQueries({ queryKey: [`badwords`] });
        toast({ title: res.data.message });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Couldn't Add Word",
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
        className="flex items-start"
      >
        <FormField
          control={form.control}
          name="word"
          render={({ field }) => (
            <FormItem className="space-y-0 ">
              <FormLabel className=" hidden">Word</FormLabel>
              <FormControl>
                <Input
                  className="border-gray-200 rounded-l-md rounded-r-none focus-visible:ring-1"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className=" w-fit aspect-square p-0 bg-blue-600 hover:bg-blue-800 rounded-r-md rounded-l-none ring-offset-0"
          aria-label="Add Word"
        >
          <IoMdAdd className=" w-5 h-5" />
        </Button>
      </form>
    </Form>
  );
};

export default AddWordForm;
