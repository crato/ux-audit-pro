'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";

const recentAudits = [
  {
    id: 1,
    projectName: "E-commerce Website",
    clientName: "TechCorp Inc.",
    status: "in_progress",
    dueDate: "2024-03-25",
  },
  {
    id: 2,
    projectName: "Mobile App",
    clientName: "StartUp Ltd.",
    status: "review",
    dueDate: "2024-03-28",
  },
  {
    id: 3,
    projectName: "Dashboard Redesign",
    clientName: "FinTech Co.",
    status: "completed",
    dueDate: "2024-03-20",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in_progress":
      return "bg-blue-100 text-blue-800";
    case "review":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case "in_progress":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "review":
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    default:
      return null;
  }
}

export default function RecentAudits() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Audits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAudits.map((audit) => (
            <div
              key={audit.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{audit.projectName}</p>
                <p className="text-sm text-muted-foreground">
                  {audit.clientName}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(audit.status)}
                  <Badge variant="secondary" className={getStatusColor(audit.status)}>
                    {audit.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Due {new Date(audit.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}