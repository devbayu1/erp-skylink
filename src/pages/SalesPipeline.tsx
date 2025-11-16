import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Target, Award, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { PipelineColumn } from "../components/sales-pipeline/PipelineColumn";
import { PipelineFilters } from "../components/sales-pipeline/PipelineFilters";
import { ConversionFunnel } from "../components/sales-pipeline/ConversionFunnel";
import type { PipelineOpportunity, PipelineStageData, PipelineMetrics, PipelineFilters as FilterType } from "../types/pipeline";

interface SalesPipelineProps {
  isWidget?: boolean;
}

const mockOpportunities: PipelineOpportunity[] = [
  // Prospect
  { id: "1", customerName: "PT Global Networks", serviceType: "Priority 6TB", value: 85200000, daysInStage: 5, stage: "prospect", salesPerson: "Melrandy Firdauz", createdDate: "2025-04-11" },
  { id: "2", customerName: "Bank Mandiri Cab. Jambi", serviceType: "Standard V4", value: 44600000, daysInStage: 3, stage: "prospect", salesPerson: "Melrandy Firdauz", createdDate: "2025-04-13" },
  { id: "3", customerName: "Kementerian PUPR", serviceType: "Custom Package", value: 125000000, daysInStage: 12, stage: "prospect", salesPerson: "John Doe", createdDate: "2025-04-04" },
  { id: "4", customerName: "PT Maju Jaya", serviceType: "Priority 2TB", value: 52800000, daysInStage: 8, stage: "prospect", salesPerson: "Jane Smith", createdDate: "2025-04-08" },
  { id: "5", customerName: "CV Tech Solutions", serviceType: "Flat Standard V4", value: 38900000, daysInStage: 4, stage: "prospect", salesPerson: "John Doe", createdDate: "2025-04-12" },
  
  // Quotation Sent
  { id: "6", customerName: "Ibu Wulan", serviceType: "Standard V4", value: 48174000, daysInStage: 7, stage: "quotation", salesPerson: "Melrandy Firdauz", createdDate: "2025-04-08" },
  { id: "7", customerName: "PT Digital Prima", serviceType: "Mini", value: 38900000, daysInStage: 4, stage: "quotation", salesPerson: "Jane Smith", createdDate: "2025-04-11" },
  { id: "8", customerName: "Freyssinet Total", serviceType: "Priority 500GB", value: 26400000, daysInStage: 2, stage: "quotation", salesPerson: "John Doe", createdDate: "2025-04-13" },
  { id: "9", customerName: "PT Indosat", serviceType: "Flat High Performance", value: 95500000, daysInStage: 9, stage: "quotation", salesPerson: "Melrandy Firdauz", createdDate: "2025-04-06" },
  
  // Negotiation
  { id: "10", customerName: "PT Buana Visualnet", serviceType: "Priority 2TB", value: 65500000, daysInStage: 15, stage: "negotiation", salesPerson: "Melrandy Firdauz", createdDate: "2025-03-31" },
  { id: "11", customerName: "CV Maju Teknologi", serviceType: "Standard V4", value: 52800000, daysInStage: 8, stage: "negotiation", salesPerson: "Jane Smith", createdDate: "2025-04-07" },
  { id: "12", customerName: "Diskominfo Muaro", serviceType: "Flat Standard V4", value: 21600000, daysInStage: 10, stage: "negotiation", salesPerson: "John Doe", createdDate: "2025-04-05" },
  
  // Won
  { id: "13", customerName: "PT Telkom Regional", serviceType: "Priority 1TB", value: 95500000, daysInStage: 0, stage: "won", salesPerson: "Melrandy Firdauz", createdDate: "2025-03-05" },
  { id: "14", customerName: "Bank BRI", serviceType: "Standard V4", value: 44600000, daysInStage: 0, stage: "won", salesPerson: "Jane Smith", createdDate: "2025-03-12" },
  
  // Lost
  { id: "15", customerName: "PT ABC Corp", serviceType: "Priority 2TB", value: 35000000, daysInStage: 0, stage: "lost", salesPerson: "John Doe", createdDate: "2025-03-20", lostReason: "Price too high" },
  { id: "16", customerName: "CV XYZ Digital", serviceType: "Mini", value: 25000000, daysInStage: 0, stage: "lost", salesPerson: "Jane Smith", createdDate: "2025-03-18", lostReason: "Chose competitor" },
];

const metrics: PipelineMetrics = {
  totalValue: 325500000,
  totalValueTrend: 12,
  activeOpportunities: 45,
  winRate: 32,
  winRateTrend: 5,
  averageDealSize: 7200000,
};

export default function SalesPipeline({ isWidget = false }: SalesPipelineProps) {
  const [opportunities, setOpportunities] = useState<PipelineOpportunity[]>(mockOpportunities);
  const [filters, setFilters] = useState<FilterType>({
    searchQuery: "",
    dateRange: { from: "", to: "" },
    salesPerson: "",
    serviceType: "",
    valueRange: { min: 0, max: 0 },
  });

  const stages: PipelineStageData[] = [
    {
      stage: "prospect",
      label: "PROSPECT",
      count: opportunities.filter((o) => o.stage === "prospect").length,
      totalValue: opportunities.filter((o) => o.stage === "prospect").reduce((sum, o) => sum + o.value, 0),
      opportunities: opportunities.filter((o) => o.stage === "prospect"),
      color: "text-gray-700",
      bgColor: "bg-gray-100",
    },
    {
      stage: "quotation",
      label: "QUOTATION SENT",
      count: opportunities.filter((o) => o.stage === "quotation").length,
      totalValue: opportunities.filter((o) => o.stage === "quotation").reduce((sum, o) => sum + o.value, 0),
      opportunities: opportunities.filter((o) => o.stage === "quotation"),
      color: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    {
      stage: "negotiation",
      label: "NEGOTIATION",
      count: opportunities.filter((o) => o.stage === "negotiation").length,
      totalValue: opportunities.filter((o) => o.stage === "negotiation").reduce((sum, o) => sum + o.value, 0),
      opportunities: opportunities.filter((o) => o.stage === "negotiation"),
      color: "text-orange-700",
      bgColor: "bg-orange-100",
    },
    {
      stage: "won",
      label: "WON",
      count: opportunities.filter((o) => o.stage === "won").length,
      totalValue: opportunities.filter((o) => o.stage === "won").reduce((sum, o) => sum + o.value, 0),
      opportunities: opportunities.filter((o) => o.stage === "won"),
      color: "text-green-700",
      bgColor: "bg-green-100",
    },
    {
      stage: "lost",
      label: "LOST",
      count: opportunities.filter((o) => o.stage === "lost").length,
      totalValue: opportunities.filter((o) => o.stage === "lost").reduce((sum, o) => sum + o.value, 0),
      opportunities: opportunities.filter((o) => o.stage === "lost"),
      color: "text-red-700",
      bgColor: "bg-red-100",
    },
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `Rp ${(amount / 1000000000).toFixed(1)}M`;
    } else if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(1)}M`;
    }
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const handleExport = () => {
    console.log("Export pipeline data");
  };

  if (isWidget) {
    return (
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-900">Sales Pipeline</CardTitle>
            <Button variant="link" className="text-[#3b82f6]">
              View Full Pipeline →
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {stages.map((stage) => (
              <div key={stage.stage} className={`${stage.bgColor} p-3 rounded-lg text-center`}>
                <div className={`text-xs ${stage.color} mb-1`}>{stage.label}</div>
                <div className="text-gray-900">{stage.count}</div>
                <div className="text-xs text-gray-600 mt-1">{formatCurrency(stage.totalValue)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-8">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-gray-900">Sales Pipeline</h1>
        <p className="text-sm text-gray-600 mt-1">Track and manage your sales opportunities</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Total Pipeline Value */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Total Pipeline Value</span>
              <div className="p-2 rounded-lg bg-blue-100">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-gray-900">{formatCurrency(metrics.totalValue)}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">+{metrics.totalValueTrend}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Opportunities */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Active Opportunities</span>
              <div className="p-2 rounded-lg bg-purple-100">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-gray-900">{metrics.activeOpportunities}</div>
          </CardContent>
        </Card>

        {/* Win Rate */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Win Rate</span>
              <div className="p-2 rounded-lg bg-green-100">
                <Award className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-gray-900">{metrics.winRate}%</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">+{metrics.winRateTrend}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Deal Size */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Average Deal Size</span>
              <div className="p-2 rounded-lg bg-orange-100">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-gray-900">{formatCurrency(metrics.averageDealSize)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <PipelineFilters filters={filters} setFilters={setFilters} onExport={handleExport} />

      {/* Pipeline Board */}
      <Card className="bg-white shadow-sm rounded-lg mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => (
              <PipelineColumn key={stage.stage} stageData={stage} formatCurrency={formatCurrency} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <ConversionFunnel stages={stages} />
    </div>
  );
}
