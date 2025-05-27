import React from "react";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  employee_number: string;
  job_title?: string;
  department?: string;
  status: string;
  full_name: string;
  username: string;
  role: string;
  joined_at?: string;
  medical_leave?: number;
  annual_leave?: number;
  salary?: number;
};

const View = ({
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
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Employee Number:</Label>
          <span className="">{employee_number}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Full Name:</Label>
          <span className="">{full_name}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Username:</Label>
          <span className="">{username}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Role:</Label>
          <span className="">{role}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Job Title:</Label>
          <span className="">{job_title || "-"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Department:</Label>
          <span className="">{department || "-"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Salary:</Label>
          <span className="">{salary || "-"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Annual Leave:</Label>
          <span className="">{annual_leave || "-"}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Medical Leave:</Label>
          <span className="">{medical_leave || "-"} </span>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label className="font-bold text-right">Status:</Label>
          <span className="">{status}</span>
        </div>
      </div>
    </div>
  );
};

export default View;
