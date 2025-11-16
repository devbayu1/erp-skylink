import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

const alerts = [
  {
    id: 1,
    message: "3 Overdue Payments > 30 days",
    severity: "high",
    icon: AlertTriangle,
  },
  {
    id: 2,
    message: "2 Delayed Installations",
    severity: "medium",
    icon: Clock,
  },
  {
    id: 3,
    message: "5 Pending Activations",
    severity: "medium",
    icon: CheckCircle,
  },
];

export function CriticalAlerts() {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Critical Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === "high"
                    ? "bg-red-50 border-red-500"
                    : "bg-orange-50 border-orange-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className={`w-5 h-5 mt-0.5 ${
                      alert.severity === "high" ? "text-red-500" : "text-orange-500"
                    }`}
                  />
                  <div className="flex-1">
                    <Badge
                      className={`mb-2 ${
                        alert.severity === "high"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-orange-500 hover:bg-orange-600"
                      }`}
                    >
                      {alert.severity === "high" ? "High Priority" : "Medium Priority"}
                    </Badge>
                    <p className="text-gray-900">{alert.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
