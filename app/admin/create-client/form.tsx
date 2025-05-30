"use client";
import { useState } from "react";
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
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  full_name: z.string().min(2).max(50),
  //   username: z.string().min(2).max(50).optional(),
  email: z.string().email().min(2).max(50),
  //   identity_card: z.string().min(2).max(50),
  phone_number: z.string().min(2).max(50),
  //   address: z.string().min(2).max(100),
});

type Props = {};

const CreateClientForm = (props: Props) => {
  const { toast } = useToast();
  const [isSubmittiing, setIsSubmittiing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      //   username: "",
      email: "",
      //   identity_card: "",
      phone_number: "",
      //   address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittiing(true);
    console.log(values);

    const res = await fetch("/api/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await res.json();

    console.log(result);

    if (!res.ok) {
      toast({ title: "Error", description: result.error });
    } else {
      toast({ title: "Success", description: "Client invited via email." });
      form.reset();
    }
    setIsSubmittiing(false);
  }
  return (
    <div className="max-w-lg mx-auto w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Full Name (Per IC)</FormLabel>
                <FormControl>
                  <Input placeholder="Azeera Binti Hamedi Halmi" {...field} />
                </FormControl>

                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="eg: +60123456789" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ewa@clerk.oth" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end pace-x-2">
            <Link href="/admin/user">
              <Button
                variant={"secondary"}
                disabled={isSubmittiing}
                className="mt-4 max-w-xs ml-auto"
              >
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmittiing}
              className="mt-4 max-w-xs ml-auto"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateClientForm;
