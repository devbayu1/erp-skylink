import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Download, ArrowUpDown, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { QuotationStatusBadge } from "./QuotationStatusBadge";
import { Quotation } from "../../types/quotation";

const mockQuotations: Quotation[] = [
  {
    id: "1",
    quotationNo: "PRT-JKT-QUOT-186-COM-4-2025",
    customerName: "Ibu Wulan",
    date: "2025-04-08",
    validUntil: "2025-04-15",
    totalAmount: 48174000,
    status: "sent",
  },
  {
    id: "2",
    quotationNo: "PRT-JKT-QUOT-185-COM-4-2025",
    customerName: "PT Buana Visualnet",
    date: "2025-04-05",
    validUntil: "2025-04-12",
    totalAmount: 65500000,
    status: "approved",
  },
  {
    id: "3",
    quotationNo: "PRT-JKT-QUOT-184-COM-3-2025",
    customerName: "Freyssinet Total",
    date: "2025-03-28",
    validUntil: "2025-04-04",
    totalAmount: 26400000,
    status: "sent",
  },
  {
    id: "4",
    quotationNo: "PRT-JKT-QUOT-183-COM-3-2025",
    customerName: "Diskominfo Muaro",
    date: "2025-03-25",
    validUntil: "2025-04-01",
    totalAmount: 21600000,
    status: "draft",
  },
  {
    id: "5",
    quotationNo: "PRT-JKT-QUOT-182-COM-3-2025",
    customerName: "PT Global Networks",
    date: "2025-03-20",
    validUntil: "2025-03-27",
    totalAmount: 85200000,
    status: "rejected",
  },
  {
    id: "6",
    quotationNo: "PRT-JKT-QUOT-181-COM-3-2025",
    customerName: "CV Maju Teknologi",
    date: "2025-03-18",
    validUntil: "2025-03-25",
    totalAmount: 52800000,
    status: "approved",
  },
  {
    id: "7",
    quotationNo: "PRT-JKT-QUOT-180-COM-2-2025",
    customerName: "PT Digital Prima",
    date: "2025-03-15",
    validUntil: "2025-03-15",
    totalAmount: 38900000,
    status: "expired",
  },
  {
    id: "8",
    quotationNo: "PRT-JKT-QUOT-179-COM-2-2025",
    customerName: "Kementerian PUPR",
    date: "2025-03-10",
    validUntil: "2025-03-17",
    totalAmount: 125000000,
    status: "sent",
  },
  {
    id: "9",
    quotationNo: "PRT-JKT-QUOT-178-COM-2-2025",
    customerName: "PT Telkom Regional",
    date: "2025-03-05",
    validUntil: "2025-03-12",
    totalAmount: 95500000,
    status: "approved",
  },
  {
    id: "10",
    quotationNo: "PRT-JKT-QUOT-177-COM-2-2025",
    customerName: "Bank Mandiri Cab. Jambi",
    date: "2025-03-01",
    validUntil: "2025-03-08",
    totalAmount: 44600000,
    status: "draft",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatCurrency = (amount: number) => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

const getDaysRemaining = (validUntil: string) => {
  const today = new Date();
  const validDate = new Date(validUntil);
  const diffTime = validDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function QuotationTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleView = (quotationId: string) => {
    navigate(`/quotations/${quotationId}`);
  };

  const handleEdit = (quotationId: string) => {
    navigate(`/quotations/${quotationId}/edit`);
  };

  const handleDownload = (quotationNo: string) => {
    // Implement PDF download logic
    console.log("Download PDF for:", quotationNo);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[280px]">
                <div className="flex items-center gap-2 cursor-pointer">
                  Quotation No.
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-[200px]">
                <div className="flex items-center gap-2 cursor-pointer">
                  Customer Name
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-2 cursor-pointer">
                  Date
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-[150px]">
                <div className="flex items-center gap-2 cursor-pointer">
                  Valid Until
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-[150px] text-right">
                <div className="flex items-center justify-end gap-2 cursor-pointer">
                  Total Amount
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="w-[130px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockQuotations.map((quotation, index) => {
              const daysRemaining = getDaysRemaining(quotation.validUntil);
              const isExpiringSoon = daysRemaining > 0 && daysRemaining < 7;

              return (
                <TableRow
                  key={quotation.id}
                  className={`hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <TableCell>
                    <button
                      onClick={() => handleView(quotation.id)}
                      className="text-[#3b82f6] hover:underline text-sm"
                    >
                      {quotation.quotationNo}
                    </button>
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {quotation.customerName}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {formatDate(quotation.date)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">
                        {formatDate(quotation.validUntil)}
                      </span>
                      {isExpiringSoon && (
                        <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                          <AlertCircle className="w-3 h-3" />
                          {daysRemaining}d
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    {formatCurrency(quotation.totalAmount)}
                  </TableCell>
                  <TableCell>
                    <QuotationStatusBadge status={quotation.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleView(quotation.id)}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(quotation.id)}
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDownload(quotation.quotationNo)}
                      >
                        <Download className="w-4 h-4 text-green-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Showing 1-{rowsPerPage} of 45 quotations
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => setRowsPerPage(Number(value))}
            >
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={currentPage === 1 ? "bg-[#3b82f6] text-white hover:bg-blue-600" : ""}
            onClick={() => setCurrentPage(1)}
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={currentPage === 2 ? "bg-[#3b82f6] text-white hover:bg-blue-600" : ""}
            onClick={() => setCurrentPage(2)}
          >
            2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={currentPage === 3 ? "bg-[#3b82f6] text-white hover:bg-blue-600" : ""}
            onClick={() => setCurrentPage(3)}
          >
            3
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={currentPage === 4 ? "bg-[#3b82f6] text-white hover:bg-blue-600" : ""}
            onClick={() => setCurrentPage(4)}
          >
            4
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={currentPage === 5 ? "bg-[#3b82f6] text-white hover:bg-blue-600" : ""}
            onClick={() => setCurrentPage(5)}
          >
            5
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 5}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
