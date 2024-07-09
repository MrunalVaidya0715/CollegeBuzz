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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import apiRequest from "@/lib/apiRequest";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { ReportAnswersReasons } from "@/data/categories";
import { useState } from "react";

const reportFormSchema = z.object({
  reason: z
    .string()
    .min(1, { message: "Reason is required" })
    .max(100, { message: "Max 100 chararacters allowed" })
    .refine(
      (value) => {
        return value.trim().length > 0;
      },
      { message: "Reason is required" }
    ),
});

interface ReportAnswerFormProps {
  id: string;
  setIsOpen: (isOpen: boolean) => void;
}
const ReportAnswerForm = ({ id, setIsOpen }: ReportAnswerFormProps) => {
  const { id: quesId } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof reportFormSchema>>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reason: "",
    },
  });
  const [selectedReason, setSelectedReason] = useState("");
  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    if (value !== "Other") {
      form.setValue("reason", value);
    } else {
      form.setValue("reason", "");
    }
  };
  async function onSubmit(values: z.infer<typeof reportFormSchema>) {
    const { reason } = values;
    try {
      const res = await apiRequest.put(`answers/report/${id}`, {
        reason,
      });
      if (res.data.message === "Answer Reported") {
        queryClient.invalidateQueries({ queryKey: [`answers.${quesId}`] });
        toast({ title: res.data.message });
        setIsOpen(false);
      } else {
        toast({
            
          variant: "destructive",
          title: "Couldn't Report Answer",
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
        className="w-full flex flex-col items-center justify-center  gap-4"
      >
        <Select value={selectedReason} onValueChange={handleReasonChange}>
          <SelectTrigger className="">
            <SelectValue
              placeholder="Select Reason"
              className=" placeholder:text-gray-400"
            />
          </SelectTrigger>
          <SelectContent className=" z-[120] max-w-sm sm:max-w-md md:max-w-[500px] max-h-[200px]  ">
            <SelectGroup>
              {ReportAnswersReasons.map((reason) => (
                <SelectItem
                  className="py-2 px-10 text-wrap"
                  key={reason.id}
                  value={reason.reason}
                >
                  {reason.reason}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedReason === "Other" && (
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Input placeholder="Mention Reason" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button
          disabled={!form.getValues("reason") || form.formState.isSubmitting}
          type="submit"
          className="mt-4 w-full disabled:opacity-70"
        >
          {form.formState.isSubmitting ? "Reporting..." : "Report"}
        </Button>
      </form>
    </Form>
  );
};

export default ReportAnswerForm;
