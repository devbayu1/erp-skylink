import { useState } from "react";
import { GripVertical, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type { PipelineOpportunity } from "../../types/pipeline";
import { Badge } from "../ui/badge";

interface PipelineCardProps {
  opportunity: PipelineOpportunity;
  formatCurrency: (amount: number) => string;
}

export function PipelineCard({ opportunity, formatCurrency }: PipelineCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const getStageColor = () => {
    switch (opportunity.stage) {
      case "prospect":
        return "border-l-gray-400";
      case "quotation":
        return "border-l-blue-500";
      case "negotiation":
        return "border-l-orange-500";
      case "won":
        return "border-l-green-500";
      case "lost":
        return "border-l-red-500";
      default:
        return "border-l-gray-400";
    }
  };

  const getCardBgColor = () => {
    if (opportunity.stage === "won") return "bg-green-50 hover:bg-green-100";
    if (opportunity.stage === "lost") return "bg-red-50 hover:bg-red-100";
    return "bg-white hover:bg-gray-50";
  };

  return (
    <>
      <Card
        className={`${getCardBgColor()} border-l-4 ${getStageColor()} shadow-sm cursor-pointer transition-all hover:shadow-md`}
        onClick={() => setShowDetail(true)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1 cursor-grab" />
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 truncate">{opportunity.customerName}</div>
              <div className="text-sm text-gray-600 mt-1">{opportunity.serviceType}</div>
              <div className="text-gray-900 mt-2">{formatCurrency(opportunity.value)}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <Clock className="w-3 h-3" />
                {opportunity.stage === "won" || opportunity.stage === "lost" ? (
                  <span>Closed</span>
                ) : (
                  <span>{opportunity.daysInStage} days in stage</span>
                )}
              </div>
              {opportunity.lostReason && (
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <XCircle className="w-3 h-3" />
                  {opportunity.lostReason}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Opportunity Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Customer Name</span>
                <p className="text-gray-900">{opportunity.customerName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Service Type</span>
                <p className="text-gray-900">{opportunity.serviceType}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Value</span>
                <p className="text-gray-900">{formatCurrency(opportunity.value)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Stage</span>
                <div className="mt-1">
                  <Badge
                    className={
                      opportunity.stage === "won"
                        ? "bg-green-500"
                        : opportunity.stage === "lost"
                        ? "bg-red-500"
                        : opportunity.stage === "negotiation"
                        ? "bg-orange-500"
                        : opportunity.stage === "quotation"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }
                  >
                    {opportunity.stage.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Sales Person</span>
                <p className="text-gray-900">{opportunity.salesPerson}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Days in Stage</span>
                <p className="text-gray-900">
                  {opportunity.stage === "won" || opportunity.stage === "lost"
                    ? "Closed"
                    : `${opportunity.daysInStage} days`}
                </p>
              </div>
              {opportunity.lostReason && (
                <div className="col-span-2">
                  <span className="text-sm text-gray-600">Lost Reason</span>
                  <p className="text-red-600">{opportunity.lostReason}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
