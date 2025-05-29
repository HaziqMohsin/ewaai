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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  full_name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  job_title: z.string().min(0).max(50).optional(),
  department: z.string().min(0).max(50).optional(),
  role: z.enum(["admin", "lawyer", "clerk", "client"]).optional(),
  salary: z.number().min(0).optional(),
  annual_leave: z.number().min(0).optional(),
  medical_leave: z.number().min(0).optional(),
  status: z.enum(["active", "resigned", "suspended"]),
});

type Props = {
  id: string;
  employee_number: string;
  job_title?: string;
  department?: string;
  status: any;
  full_name: string;
  username: string;
  role: any;
  joined_at?: string;
  medical_leave?: number;
  annual_leave?: number;
  salary?: number;
};

const EditUserForm = ({
  id,
  employee_number,
  job_title,
  department,
  status,
  full_name,
  username,
  role,
  joined_at,
  medical_leave,
  annual_leave,
  salary,
}: Props) => {
  const { toast } = useToast();
  const [isSubmittiing, setIsSubmittiing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: full_name || "",
      username: username || "",
      role: role,
      job_title: job_title || "",
      department: department || "",
      medical_leave: medical_leave || 0,
      annual_leave: annual_leave || 0,
      salary: salary || 0,
      status: status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                <FormLabel>
                  Job title{" "}
                  <span className="opacity-50 text-xs">(optional)</span>
                </FormLabel>
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
                <FormLabel>
                  Department{" "}
                  <span className="opacity-50 text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tech" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  Salary <span className="opacity-50 text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annual_leave"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  Annual Leave{" "}
                  <span className="opacity-50 text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medical_leave"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  Medical Leave{" "}
                  <span className="opacity-50 text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="resigned">Resigned</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center space-x-2">
            <Link href={`/admin/user/${id}`}>
              <Button
                variant={"secondary"}
                disabled={isSubmittiing}
                className="mt-4 max-w-xs"
              >
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmittiing}
              className="mt-4 max-w-xs"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;
