// src/pages/sales/SiteInvestmentList.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Download, Eye, Pencil, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
interface SiteInvestment {
  id: string;
  siNumber: string;
  siDate: string;
  customerName: string;
  projectName: string;
  totalInvestment: number;
  managedServiceCost: number;
  materialCost: number;
  didCost: number;
  status: "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Revised";
  createdBy: string;
  createdAt: string;
  hasQuotation: boolean;
}

// Mock Data
const mockSIData: SiteInvestment[] = [
  {
    id: "1",
    siNumber: "SI-2025-001",
    siDate: "2025-01-15",
    customerName: "PT Buana Visualnet Sentra",
    projectName: "Starlink Installation - Priority 2TB",
    totalInvestment: 65500000,
    managedServiceCost: 26400000,
    materialCost: 32100000,
    didCost: 7000000,
    status: "Approved",
    createdBy: "Melrandy Firdauz",
    createdAt: "2025-01-15 10:30",
    hasQuotation: true,
  },
  {
    id: "2",
    siNumber: "SI-2025-002",
    siDate: "2025-01-18",
    customerName: "Freyssinet Total Technology",
    projectName: "Starlink Standard V4 - Priority 500GB",
    totalInvestment: 28600000,
    managedServiceCost: 12900000,
    materialCost: 12000000,
    didCost: 3700000,
    status: "Approved",
    createdBy: "Paul Hutajulu",
    createdAt: "2025-01-18 14:20",
    hasQuotation: true,
  },
  {
    id: "3",
    siNumber: "SI-2025-003",
    siDate: "2025-01-20",
    customerName: "Diskominfo Muaro Jambi",
    projectName: "Starlink Flat V4 - Multiple Units",
    totalInvestment: 45800000,
    managedServiceCost: 21600000,
    materialCost: 18000000,
    didCost: 6200000,
    status: "Pending Approval",
    createdBy: "Melrandy Firdauz",
    createdAt: "2025-01-20 09:15",
    hasQuotation: false,
  },
  {
    id: "4",
    siNumber: "SI-2025-004",
    siDate: "2025-01-22",
    customerName: "PT Global Networks",
    projectName: "Starlink Enterprise Solution",
    totalInvestment: 125000000,
    managedServiceCost: 52000000,
    materialCost: 58000000,
    didCost: 15000000,
    status: "Draft",
    createdBy: "Paul Hutajulu",
    createdAt: "2025-01-22 11:45",
    hasQuotation: false,
  },
  {
    id: "5",
    siNumber: "SI-2025-005",
    siDate: "2025-01-23",
    customerName: "Ibu Wulan (Lampung)",
    projectName: "Starlink Standard V4 - Lampung",
    totalInvestment: 48174000,
    managedServiceCost: 26400000,
    materialCost: 17000000,
    didCost: 4774000,
    status: "Pending Approval",
    createdBy: "Melrandy Firdauz",
    createdAt: "2025-01-23 15:30",
    hasQuotation: false,
  },
];

// Status Badge Component
function StatusBadge({ status }: { status: SiteInvestment["status"] }) {
  const styles = {
    Draft: "bg-gray-100 text-gray-700",
    "Pending Approval": "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Revised: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

// Metric Card Component
function MetricCard({ title, value, subtitle, icon: Icon }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {Icon && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Main Component
export default function SiteInvestmentList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Filter data
  const filteredData = mockSIData.filter((si) => {
    const matchSearch =
      si.siNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      si.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      si.projectName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === "all" || si.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Calculate metrics
  const metrics = {
    total: mockSIData.length,
    pendingApproval: mockSIData.filter((si) => si.status === "Pending Approval").length,
    approved: mockSIData.filter((si) => si.status === "Approved").length,
    totalValue: mockSIData.reduce((sum, si) => sum + si.totalInvestment, 0),
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Investment (SI)</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage site investment documents and cost breakdown
          </p>
        </div>
        <Button onClick={() => navigate("/sales/si/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Create New SI
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total SI"
          value={metrics.total}
          subtitle="All site investments"
          icon={FileText}
        />
        <MetricCard
          title="Pending Approval"
          value={metrics.pendingApproval}
          subtitle="Awaiting approval"
        />
        <MetricCard
          title="Approved"
          value={metrics.approved}
          subtitle="Ready for quotation"
        />
        <MetricCard
          title="Total Value"
          value={formatCurrency(metrics.totalValue)}
          subtitle="Combined investment"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by SI number, customer, or project name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Revised">Revised</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setDateFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Site Investment Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SI Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead className="text-right">Total Investment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((si) => (
                    <TableRow key={si.id} className="hover:bg-gray-50">
                      <TableCell>
                        <button
                          onClick={() => navigate(`/sales/si/${si.id}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          {si.siNumber}
                        </button>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(si.siDate)}
                      </TableCell>
                      <TableCell className="font-medium">{si.customerName}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {si.projectName}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(si.totalInvestment)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={si.status} />
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {si.createdBy}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/sales/si/${si.id}`)}
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/sales/si/${si.id}/edit`)}
                            title="Edit"
                            disabled={si.status === "Approved"}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          {si.status === "Approved" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/sales/si/${si.id}/quotation`)}
                              title="Create Quotation"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <FileText className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              // Handle download
                              console.log("Download SI:", si.id);
                            }}
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              // Handle delete
                              if (confirm("Are you sure you want to delete this SI?")) {
                                console.log("Delete SI:", si.id);
                              }
                            }}
                            title="Delete"
                            disabled={si.status === "Approved" || si.hasQuotation}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No site investments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Showing 1-{filteredData.length} of {filteredData.length} site investments
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}