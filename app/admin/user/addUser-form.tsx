"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  full_name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  email_confirm: z.boolean(),
  role: z.enum(["admin", "lawyer", "clerk", "client"]).optional(),
});

type Props = {};

const AddUser = (props: Props) => {
  const [open, setOpen] = useState(false);
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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittiing(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const { username, email, password, role, full_name } = values;

    const res = await fetch("/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        full_name,
        role,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setOpen(false);
      form.reset();
    } else {
      const error = await res.json();
      console.error("Error creating user:", error);
    }

    setIsSubmittiing(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
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

            <Button type="submit" disabled={isSubmittiing} className="mt-4">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
