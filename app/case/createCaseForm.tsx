"use client";

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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Zen_Loop } from "next/font/google";

type Profile = {
  id: string;
  full_name: string;
  role: "client" | "lawyer" | "clerk";
};

type Client = {
  id: string;
  full_name: string;
};

type Props = {
  profiles: Profile[];
  client: Client[];
  currentUserId: string;
};

// Zod schema for validation
const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  case_type: z.string().min(2),
  court_level: z.string().optional(),
  client_id: z.string().uuid(),
  lawyers: z.string().uuid(),
  clerks: z.string().uuid().optional(),
});

export default function CreateCaseForm({
  profiles,
  client,
  currentUserId,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      case_type: "",
      court_level: "",
      client_id: "",
      lawyers: "",
      clerks: "",
    },
  });

  const router = useRouter();
  const lawyers = profiles.filter((p) => p.role === "lawyer");
  const clerks = profiles.filter((p) => p.role === "clerk");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const participants = [
    //   ...values.lawyers.map((id) => ({ profile_id: id, role: "lawyer" })),
    //   ...(values.clerks?.map((id) => ({ profile_id: id, role: "clerk" })) ||
    //     []),
    // ];

    // const res = await fetch("/api/cases/create", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     ...values,
    //     created_by: currentUserId,
    //     participants,
    //   }),
    // });

    // const result = await res.json();

    // if (!res.ok) {
    //   toast({ title: "Error", description: result.error });
    // } else {
    //   toast({ title: "Success", description: "Case created successfully" });
    //   router.push(`/admin/cases/${result.case_id}`);
    // }

    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Housing Loan – Nurul Aina"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Optional case notes..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="case_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case Type</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. civil" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="court_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Court Level</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. High Court (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {client.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lawyers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lawyer</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lawyers" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {lawyers.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clerks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clerks</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select clerk" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clerks.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating..." : "Create Case"}
        </Button>
      </form>
    </Form>
  );
}
