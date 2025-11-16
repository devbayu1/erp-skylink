import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { PipelineStageData } from "../../types/pipeline";

interface ConversionFunnelProps {
  stages: PipelineStageData[];
}

export function ConversionFunnel({ stages }: ConversionFunnelProps) {
  // Filter out lost stage for funnel
  const funnelStages = stages.filter((s) => s.stage !== "lost");

  const calculateConversionRate = (currentIndex: number) => {
    if (currentIndex === 0) return null;
    const current = funnelStages[currentIndex].count;
    const previous = funnelStages[currentIndex - 1].count;
    if (previous === 0) return 0;
    return Math.round((current / previous) * 100);
  };

  return (
    <Card className="bg-white shadow-sm rounded-lg">
      <CardHeader>
        <CardTitle className="text-gray-900">Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          {funnelStages.map((stage, index) => {
            const conversionRate = calculateConversionRate(index);
            const width = 100 - index * 15; // Decreasing width for funnel effect

            return (
              <div key={stage.stage} className="flex items-center flex-1">
                {/* Stage Block */}
                <div className="flex-1">
                  <div
                    className={`${stage.bgColor} rounded-lg p-4 transition-all hover:shadow-md`}
                    style={{
                      width: `${width}%`,
                      margin: "0 auto",
                    }}
                  >
                    <div className={`text-sm ${stage.color} mb-2 text-center`}>
                      {stage.label}
                    </div>
                    <div className="text-center text-gray-900">{stage.count}</div>
                  </div>
                </div>

                {/* Arrow with conversion rate */}
                {index < funnelStages.length - 1 && (
                  <div className="flex flex-col items-center px-2">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {conversionRate !== null && (
                      <span className="text-xs text-gray-600 mt-1">{conversionRate}%</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Total Opportunities</div>
              <div className="text-gray-900 mt-1">
                {stages.reduce((sum, s) => sum + s.count, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Active in Pipeline</div>
              <div className="text-gray-900 mt-1">
                {stages
                  .filter((s) => s.stage !== "won" && s.stage !== "lost")
                  .reduce((sum, s) => sum + s.count, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Won</div>
              <div className="text-green-600 mt-1">
                {stages.find((s) => s.stage === "won")?.count || 0}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Lost</div>
              <div className="text-red-600 mt-1">
                {stages.find((s) => s.stage === "lost")?.count || 0}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
