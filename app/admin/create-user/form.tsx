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

const formSchema = z.object({
  full_name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  email_confirm: z.boolean(),
  job_title: z.string().min(0).max(50).optional(),
  department: z.string().min(0).max(50).optional(),
  role: z.enum(["admin", "lawyer", "clerk", "client"]).optional(),
});

type Props = {};

const CreateUserForm = (props: Props) => {
  const [isSubmittiing, setIsSubmittiing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      password: "",
      email_confirm: true,
      role: "clerk",
      job_title: "",
      department: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittiing(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const {
      username,
      email,
      password,
      role,
      full_name,
      job_title,
      department,
    } = values;

    const res = await fetch("/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        full_name,
        role,
        password,
        job_title,
        department,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      form.reset();
    } else {
      const error = await res.json();
      console.error("Error creating user:", error);
    }

    setIsSubmittiing(false);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="lawyer">Lawyer</SelectItem>
                    <SelectItem value="clerk">Clerk</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Azeera Binti Hamedi Halmi" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input placeholder="clerk" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Tech" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="azeera" {...field} />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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

export default CreateUserForm;
