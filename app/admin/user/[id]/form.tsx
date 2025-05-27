import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  full_name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  email_confirm: z.boolean(),
  job_title: z.string().min(0).max(50).optional(),
  department: z.string().min(0).max(50).optional(),
  role: z.enum(["admin", "lawyer", "clerk", "client"]).optional(),
  salary: z.number().min(0).optional(),
  annual_leave: z.number().min(0).optional(),
  medical_leave: z.number().min(0).optional(),
});

type Props = {};

const UserForm = (props: Props) => {
  return <div>UserForm</div>;
};

export default UserForm;
