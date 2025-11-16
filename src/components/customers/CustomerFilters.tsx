import { useState } from "react";
import { Search, Download, Calendar } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { CustomerType, CustomerStatus } from "../../types/customer";

export function CustomerFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customerType, setCustomerType] = useState<CustomerType>("all");
  const [customerStatus, setCustomerStatus] = useState<CustomerStatus>("all");

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search customer name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Customer Type Filter */}
        <Select
          value={customerType}
          onValueChange={(value) => setCustomerType(value as CustomerType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Customer Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={customerStatus}
          onValueChange={(value) => setCustomerStatus(value as CustomerStatus)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Picker */}
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          Date Range
        </Button>

        {/* Export Button */}
        <Button variant="outline" className="gap-2 ml-auto">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
