import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import type { CustomerDetail } from "../../types/customerDetail";

interface InfoItem {
  label: string;
  value: string;
  highlight?: "green" | "orange" | "red";
  badge?: "destructive" | "outline";
}

interface CustomerInfoCardProps {
  title: string;
  type?: "default" | "contacts" | "summary";
  data?: InfoItem[];
  contacts?: CustomerDetail["contacts"];
}

export function CustomerInfoCard({
  title,
  type = "default",
  data,
  contacts,
}: CustomerInfoCardProps) {
  if (type === "contacts" && contacts) {
    return (
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Primary Contact */}
          <div className="pb-5 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-500 text-white">
                  {contacts.primary.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-900">{contacts.primary.name}</span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-600 border-blue-200"
                  >
                    Primary
                  </Badge>
                </div>

                {contacts.primary.position && (
                  <div className="text-sm text-gray-600 mb-2">
                    {contacts.primary.position}
                  </div>
                )}

                {contacts.primary.email && (
                  <div className="text-sm text-gray-700 mb-1">
                    {contacts.primary.email}
                  </div>
                )}

                <div className="text-sm text-gray-700">{contacts.primary.phone}</div>
              </div>
            </div>
          </div>

          {/* Technical Contact */}
          <div className="pb-5 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-purple-500 text-white">
                  {contacts.technical.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-900">{contacts.technical.name}</span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-purple-50 text-purple-600 border-purple-200"
                  >
                    Technical
                  </Badge>
                </div>

                <div className="text-sm text-gray-700">{contacts.technical.phone}</div>
              </div>
            </div>
          </div>

          {/* Financial Contact */}
          <div>
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-green-500 text-white">
                  {contacts.financial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-900">{contacts.financial.name}</span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-50 text-green-600 border-green-200"
                  >
                    Financial
                  </Badge>
                </div>

                <div className="text-sm text-gray-700">{contacts.financial.phone}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === "summary" && data) {
    return (
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="text-sm text-gray-600">{item.label}</div>
              <div className="text-right">
                {item.badge === "destructive" ? (
                  <Badge variant="destructive" className="text-xs">
                    {item.value}
                  </Badge>
                ) : item.badge === "outline" ? (
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-600 border-blue-200"
                  >
                    {item.value}
                  </Badge>
                ) : (
                  <div
                    className={`text-gray-900 ${
                      item.highlight === "green"
                        ? "text-green-600"
                        : item.highlight === "orange"
                        ? "text-orange-600"
                        : item.highlight === "red"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {item.value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Default type
  return (
    <Card className="bg-white shadow-sm rounded-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data?.map((item) => (
          <div key={item.label}>
            <div className="text-sm text-gray-600 mb-1">{item.label}</div>
            <div className="text-gray-900">{item.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
