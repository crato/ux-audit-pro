'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", audits: 12 },
  { name: "Feb", audits: 15 },
  { name: "Mar", audits: 10 },
  { name: "Apr", audits: 18 },
  { name: "May", audits: 20 },
  { name: "Jun", audits: 14 },
];

export default function Overview() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Audit Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="audits" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}