import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Package, Layers, Fingerprint } from "lucide-react";

const actionCards = [
  {
    title: "Deploy it in a sec",
    icon: Package,
  },
  {
    title: "Manage roles at a higher level",
    icon: Layers,
  },
  {
    title: "Secure your application's backend",
    icon: Fingerprint,
  },
];

const stats = [
  { title: "Total users", value: "9", subtitle: "All time" },
  { title: "Active users", value: "1", subtitle: "September 2024" },
  { title: "Sign-ups", value: "1", subtitle: "September 2024" },
  { title: "Sign-ins", value: "0", subtitle: "September 2024" },
];

const recentSignUps = [
  {
    name: "Cold Palmer",
    email: "kinfetare83@gmail.com",
    time: "Sat Nov 18, 21:30",
  },
  {
    name: "Eden Hazard",
    email: "kinfetare83@gmail.com",
    time: "Sat Nov 18, 21:30",
  },
  {
    name: "Kante",
    email: "kinfetare83@gmail.com",
    time: "Sat Nov 18, 21:30",
  },
  {
    name: "KINFISH",
    email: "kinfetare83@gmail.com",
    time: "Sat Nov 18, 21:30",
  },
];

export default function OvervieewDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">
        Congratulations, your application has users!
      </h1>
      <p className="text-gray-600 mb-8">
        Better Auth handles authentication and user management for you.{" "}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {actionCards.map((card, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <card.icon className="w-12 h-12 mb-4 text-gray-600" />
              <p className="text-center text-sm">{card.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent sign-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentSignUps.map((user, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>
                        {user.name.charAt(0) || user.email.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name || user.email}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{user.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent sign-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 py-8">
              No recent sign-ins to show
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
