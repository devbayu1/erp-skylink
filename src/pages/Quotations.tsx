import { Plus, ChevronRight, FileText, Send, TrendingUp, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { QuotationFilters } from "../components/quotations/QuotationFilters";
import { QuotationTable } from "../components/quotations/QuotationTable";
import { QuotationMetrics } from "../types/quotation";

const metrics: QuotationMetrics = {
  totalQuotations: 45,
  sentThisMonth: 12,
  conversionRate: 32,
  totalValue: "Rp 125,5M",
};

export default function Quotations() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <span className="text-xs">Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-xs">Sales & Quotation</span>
        </div>

        {/* Title and Button */}
        {/* <div className="flex items-center justify-between">
          <h1 className="text-gray-900">Sales & Quotation</h1>
          <Button
            onClick={() => navigate("/quotations/new")}
            className="bg-[#3b82f6] hover:bg-blue-600 gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Quotation
          </Button>
        </div> */}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Total Quotations */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Total Quotations</span>
              <div className="p-2 rounded-lg bg-blue-100">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-gray-900">{metrics.totalQuotations}</div>
          </CardContent>
        </Card>

        {/* Sent This Month */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Sent This Month</span>
              <div className="p-2 rounded-lg bg-purple-100">
                <Send className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-gray-900">{metrics.sentThisMonth}</div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Conversion Rate</span>
              <div className="p-2 rounded-lg bg-green-100">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-gray-900">{metrics.conversionRate}%</div>
          </CardContent>
        </Card>

        {/* Total Value */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Total Value</span>
              <div className="p-2 rounded-lg bg-orange-100">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-gray-900">{metrics.totalValue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <QuotationFilters />

      {/* Quotation Table */}
      <QuotationTable />
    </div>
  );
}
