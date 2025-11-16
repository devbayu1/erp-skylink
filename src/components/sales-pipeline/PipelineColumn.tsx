import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { PipelineCard } from "./PipelineCard";
import type { PipelineStageData } from "../../types/pipeline";

interface PipelineColumnProps {
  stageData: PipelineStageData;
  formatCurrency: (amount: number) => string;
}

export function PipelineColumn({ stageData, formatCurrency }: PipelineColumnProps) {
  const [showAll, setShowAll] = useState(false);
  const maxVisible = 5;
  const visibleOpportunities = showAll
    ? stageData.opportunities
    : stageData.opportunities.slice(0, maxVisible);

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className={`${stageData.bgColor} p-4 rounded-t-lg`}>
        <div className={`text-sm ${stageData.color} mb-2`}>{stageData.label}</div>
        <div className="flex items-center justify-between">
          <span className="text-gray-900">{stageData.count} items</span>
          <span className="text-gray-900">{formatCurrency(stageData.totalValue)}</span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="bg-gray-50 p-4 rounded-b-lg min-h-[400px] space-y-3">
        {visibleOpportunities.map((opportunity) => (
          <PipelineCard
            key={opportunity.id}
            opportunity={opportunity}
            formatCurrency={formatCurrency}
          />
        ))}

        {/* Show More/Less Button */}
        {stageData.opportunities.length > maxVisible && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[#3b82f6] hover:bg-blue-50"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show More ({stageData.opportunities.length - maxVisible})
              </>
            )}
          </Button>
        )}

        {stageData.opportunities.length === 0 && (
          <div className="text-center text-gray-500 py-8 text-sm">No opportunities</div>
        )}
      </div>
    </div>
  );
}
