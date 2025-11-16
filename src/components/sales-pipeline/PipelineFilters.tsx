import { Search, Download, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PipelineFilters as FilterType } from "../../types/pipeline";

interface PipelineFiltersProps {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  onExport: () => void;
}

const salesPeople = [
  "All Sales People",
  "Melrandy Firdauz",
  "John Doe",
  "Jane Smith",
];

const serviceTypes = [
  "All Services",
  "Standard V4",
  "Flat Standard V4",
  "Flat High Performance",
  "Mini",
  "Priority 40GB",
  "Priority 1TB",
  "Priority 2TB",
  "Priority 6TB",
  "Custom Package",
];

export function PipelineFilters({ filters, setFilters, onExport }: PipelineFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search opportunities..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={filters.dateRange.from}
            onChange={(e) =>
              setFilters({
                ...filters,
                dateRange: { ...filters.dateRange, from: e.target.value },
              })
            }
            className="w-[150px]"
            placeholder="From"
          />
          <span className="text-gray-500">-</span>
          <Input
            type="date"
            value={filters.dateRange.to}
            onChange={(e) =>
              setFilters({
                ...filters,
                dateRange: { ...filters.dateRange, to: e.target.value },
              })
            }
            className="w-[150px]"
            placeholder="To"
          />
        </div>

        {/* Sales Person Filter */}
        <Select
          value={filters.salesPerson}
          onValueChange={(value) => setFilters({ ...filters, salesPerson: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sales Person" />
          </SelectTrigger>
          <SelectContent>
            {salesPeople.map((person) => (
              <SelectItem key={person} value={person}>
                {person}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Service Type Filter */}
        <Select
          value={filters.serviceType}
          onValueChange={(value) => setFilters({ ...filters, serviceType: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypes.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Export Button */}
        <Button variant="outline" onClick={onExport} className="gap-2 ml-auto">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
