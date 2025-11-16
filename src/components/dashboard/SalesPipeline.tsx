import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const pipelineData = [
  { stage: "Prospect", value: 45, color: "#3b82f6", width: "100%" },
  { stage: "Quotation", value: 32, color: "#60a5fa", width: "71%" },
  { stage: "Negotiation", value: 18, color: "#93c5fd", width: "40%" },
  { stage: "Won", value: 12, color: "#10b981", width: "27%" },
];

export function SalesPipeline() {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pipelineData.map((item) => (
            <div key={item.stage} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{item.stage}</span>
                <span className="text-gray-900">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className="h-full flex items-center justify-center text-white text-sm transition-all duration-300"
                  style={{
                    width: item.width,
                    backgroundColor: item.color,
                  }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
