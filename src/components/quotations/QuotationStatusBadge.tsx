import { 
  FileText, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock 
} from "lucide-react";
import { Badge } from "../ui/badge";
import { QuotationStatus } from "../../types/quotation";

interface QuotationStatusBadgeProps {
  status: QuotationStatus;
}

export function QuotationStatusBadge({ status }: QuotationStatusBadgeProps) {
  const configs = {
    draft: {
      label: "Draft",
      className: "bg-gray-500 hover:bg-gray-600",
      icon: FileText,
    },
    sent: {
      label: "Sent",
      className: "bg-blue-500 hover:bg-blue-600",
      icon: Send,
    },
    approved: {
      label: "Approved",
      className: "bg-green-500 hover:bg-green-600",
      icon: CheckCircle,
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-500 hover:bg-red-600",
      icon: XCircle,
    },
    expired: {
      label: "Expired",
      className: "bg-orange-500 hover:bg-orange-600",
      icon: Clock,
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} gap-1 rounded-full`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
