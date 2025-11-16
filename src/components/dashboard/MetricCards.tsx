import { ArrowUp, Briefcase, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const metrics = [
  {
    title: "Total Revenue",
    value: "Rp 2.5M",
    icon: ArrowUp,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    trend: "up",
  },
  {
    title: "Active Projects",
    value: "24",
    icon: Briefcase,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    title: "Overdue Invoices",
    value: "8",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    title: "Pending Approvals",
    value: "12",
    icon: Clock,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
];

export function MetricCards() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">{metric.title}</span>
                <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                  <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">{metric.value}</span>
                {metric.trend === "up" && (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
