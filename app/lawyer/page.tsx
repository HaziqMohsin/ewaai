import React from "react";

type Props = {};

const Lawyer = async (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-medium">Lawyer</h1>
      <p className="text-sm text-foreground">This is the lawyer page.</p>
      <div className="flex flex-col gap-2 mt-8">
        <p className="text-sm text-foreground"></p>
      </div>
    </div>
  );
};

export default Lawyer;
