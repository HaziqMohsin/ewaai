"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const FormSchema = z.object({
  status: z.string(),
});

type Props = {
  cases?: any[];
};

const PopupEditStatus = ({ cases }: Props) => {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const editStatus = searchParams.get("editStatus");
  const caseId = searchParams.get("caseId");

  const currentCaseStatus = cases?.find((c) => c.id === caseId)?.status;

  console.log(currentCaseStatus);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: currentCaseStatus,
    },
  });

  useEffect(() => {
    if (searchParams.has("editStatus") && searchParams.has("caseId")) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [editStatus]);

  useEffect(() => {
    form.setValue("status", currentCaseStatus);
  }, [currentCaseStatus]);

  const closePopup = (e: any) => {
    e.preventDefault();
    setOpen(false);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("editStatus");
    params.delete("caseId");
    router.replace(`/cases`, { scroll: false });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const response = await fetch(`/api/cases/${caseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: data.status,
      }),
    });

    if (response.ok) {
      toast({
        title: "Status updated successfully",
        description: `Case status has been updated to ${data.status}.`,
      });
      closePopup(new Event("submit"));
    } else {
      const errorData = await response.json();
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: errorData.error || "Failed to update case status.",
      });
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a verified email to display"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 items-center justify-end mt-8">
                <Button variant="outline" onClick={(e) => closePopup(e)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupEditStatus;
