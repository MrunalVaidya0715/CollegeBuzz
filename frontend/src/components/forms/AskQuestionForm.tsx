import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategoriesOptions } from "@/data/categories";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "@/lib/apiRequest";
import { useState } from "react";
import SimilarQuestionsDrawer, {
  SimilarQues,
} from "../dialogs/SimilarQuestionsDrawer";
import useDialogStore from "@/store/useDialogStore";
import { useToast } from "../ui/use-toast";
const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title required" })
    .max(150, { message: "Max 150 characters are allowed" }),
  branch: z.string().min(1, { message: "Branch is required" }),
  category: z.string().min(1, { message: "Category is required" }),
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

export type FormSchema = z.infer<typeof formSchema>;

interface AskQuestionFormProps {
  setIsAskQuesOpen: (arg: boolean) => void;
}

const AskQuestionForm = ({ setIsAskQuesOpen }: AskQuestionFormProps) => {
  const [similarQuestions, setSimilarQuestions] = useState<SimilarQues[] | []>(
    []
  );
  const [embeddedResponse, setEmbeddedResponse] = useState<number[]>([]);
  const [status, setStatus] = useState<string>("Ask Question");
  const setDrawerOpen = useDialogStore((state) => state.setIsDrawerOpen);
  const {toast} = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      branch: "All",
      category: "general",
      description: "",
    },
  });
  const handleCreateQuestion = async (
    values: FormSchema,
    embedding: number[]
  ) => {
    const { title, description, branch, category } = values;
    try {
      setStatus("Asking Question...");
      await apiRequest.post("questions/create-question", {
        title,
        description,
        branch,
        category,
        embedding,
      });
      setStatus("Ask Question");
      setIsAskQuesOpen(false);
      toast({title:"Question uploaded Successfully"})
    } catch (error) {
      toast({variant:"destructive",title:"Question not uploaded", description:"Please try again!"})
      console.error(error);
      setStatus("Ask Question");
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description } = values;
    const sanitizedDescription = description.replace(/<[^>]+>/g, "");

    try {
      setStatus("Uploading Question...");
      const embedResponse = await apiRequest.post("questions/embed-question", {
        title,
        description: sanitizedDescription,
      });
      setEmbeddedResponse(embedResponse.data);

      setStatus("Finding Similar Question...");
      const getSimilarQuesResponse = await apiRequest.post(
        "questions/find-similar-questions",
        {
          embedding: embedResponse.data,
        }
      );
      setSimilarQuestions(getSimilarQuesResponse.data);
      if (getSimilarQuesResponse.data.length > 0) {
        setDrawerOpen(true);
      } 
      else {
        await handleCreateQuestion(values, embedResponse.data);
        setIsAskQuesOpen(false);
      }

      setStatus("Ask Question");
    } catch (error) {
      toast({variant:"destructive",title:"Something went wrong", description:"Please try again!"})
      console.error(error);
      setStatus("Ask Question");
    }
  }

  return (
    <>
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
          {/* Branch, Category */}
          <div className="w-full grid grid-cols-2 items-end sm:items-start gap-3">
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem className=" space-y-1">
                  <FormLabel>Branch</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select Branch"
                          className="  placeholder:text-gray-400"
                        />
                      </SelectTrigger>
                      <SelectContent className="z-[120]">
                        <SelectGroup>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="CE">CE</SelectItem>
                          <SelectItem value="CSE">CSE</SelectItem>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="EXTC">EXTC</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select Category"
                          className="  placeholder:text-gray-400"
                        />
                      </SelectTrigger>
                      <SelectContent className="z-[120]">
                        <SelectGroup>
                          {CategoriesOptions.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.value}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Description</FormLabel>
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
            {status}
          </Button>
        </form>
      </Form>
      <SimilarQuestionsDrawer
        similarQues={similarQuestions}
        onAskQuestion={() => {
          handleCreateQuestion(form.getValues(), embeddedResponse);
          setIsAskQuesOpen(true);
        }}
      />
    </>
  );
};

export default AskQuestionForm;
