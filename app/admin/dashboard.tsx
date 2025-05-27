import React from "react";
import CardDashboard from "./user/cardDashboard";

type Props = {};

const Dashboard = async (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardDashboard title={"Active Case"} description="case" content="hello" />
      <CardDashboard title={"Active Case"} description="case" content="hello" />
      <CardDashboard title={"Active Case"} description="case" content="hello" />
      <CardDashboard title={"Active Case"} description="case" content="hello" />
    </div>
  );
};

export default Dashboard;
