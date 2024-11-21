'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "",
      initials: "JD",
    },
    action: "added a new finding",
    target: "E-commerce Website Audit",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "",
      initials: "JS",
    },
    action: "completed",
    target: "Mobile App UX Review",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Mike Johnson",
      avatar: "",
      initials: "MJ",
    },
    action: "started",
    target: "Dashboard Redesign Audit",
    time: "6 hours ago",
  },
  {
    id: 4,
    user: {
      name: "Sarah Wilson",
      avatar: "",
      initials: "SW",
    },
    action: "commented on",
    target: "E-commerce Website Audit",
    time: "8 hours ago",
  },
];

export default function Activity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-semibold">{activity.target}</span>
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}