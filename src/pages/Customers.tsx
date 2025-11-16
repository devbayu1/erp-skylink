import { Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CustomerFilters } from "../components/customers/CustomerFilters";
import { CustomerTable } from "../components/customers/CustomerTable";

export default function Customers() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <span className="text-xs">Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-xs">Customer Management</span>
        </div>

        {/* Title and Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-gray-900">Customer Management</h1>
          <Button
            onClick={() => navigate("/customers/new")}
            className="bg-[#3b82f6] hover:bg-blue-600 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Customer
          </Button>
        </div>
      </div>

      {/* Filters */}
      <CustomerFilters />

      {/* Customer Table */}
      <CustomerTable />
    </div>
  );
}
