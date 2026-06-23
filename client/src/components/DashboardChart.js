import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function DashboardChart({ data }) {

  return (

    <div
      className="card shadow border-0 rounded-4 p-4 mt-4"
    >

      <h4 className="mb-4">

        Blood Analytics Chart

      </h4>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="bloodGroup" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="availableBlood"
            fill="#dc3545"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default DashboardChart;