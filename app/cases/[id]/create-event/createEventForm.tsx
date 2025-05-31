"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Validation schema using Zod
const formSchema = z.object({
  event_type: z.enum([
    "hearing",
    "filing_deadline",
    "meeting",
    "submission",
    "approval",
    "disbursement",
    "other",
  ]),
  title: z.string().min(3, "Title is required"),
  notes: z.string().optional(),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string().min(1, "Time is required"),
});

type Props = {
  caseId: string;
};

export default function CreateCaseEventForm({ caseId }: Props) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event_type: "hearing",
      title: "",
      notes: "",
      date: new Date(), // Default to today
      time: "", // Default time
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dateObj = new Date(values.date);
    const [hours, minutes] = values.time.split(":").map(Number);
    dateObj.setHours(hours, minutes, 0, 0); // Set time to the selected date
    const event_date = dateObj.toISOString(); // Convert to ISO string for consistency

    const body = {
      ...values,
      event_date,
      caseId,
    };

    const res = await fetch("/api/case-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    console.log(result);

    if (!res.ok) {
      toast({ title: "Error", description: result.error });
    } else {
      toast({ title: "Success", description: result.message });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Event Type */}
        <FormField
          control={form.control}
          name="event_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hearing">Hearing</SelectItem>
                  <SelectItem value="filing_deadline">
                    Filing Deadline
                  </SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="submission">Submission</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="disbursement">Disbursement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Submit SPA to Bank" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Optional notes..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date/Time */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value as any}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 48 }, (_, i) => {
                      const hour24 = Math.floor(i / 2);
                      const minute = i % 2 === 0 ? "00" : "30";

                      const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
                      const period = hour24 < 12 ? "AM" : "PM";

                      const label = `${hour12}:${minute} ${period}`;
                      const value = `${String(hour24).padStart(2, "0")}:${minute}`;

                      return (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Adding..." : "Add Event"}
        </Button>
      </form>
    </Form>
  );
}
