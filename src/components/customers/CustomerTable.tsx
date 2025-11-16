import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { Customer } from "../../types/customer";

const mockCustomers: Customer[] = [
  {
    id: "CUS-001",
    companyName: "PT Buana Visualnet Sentra",
    contactPerson: "Almen Manihuruk",
    email: "almen@bvs.co.id",
    phone: "+62 852-6620-6667",
    type: "active",
    npwp: "93.189.298.8-332.000",
    totalOrders: 5,
    status: "regular",
  },
  {
    id: "CUS-002",
    companyName: "Freyssinet Total Technology",
    contactPerson: "Tax Admin",
    email: "admin@freyssinet.co.id",
    phone: "021-5551234",
    type: "active",
    npwp: "0013626700015000",
    totalOrders: 12,
    status: "vip",
  },
  {
    id: "CUS-003",
    companyName: "Diskominfo Muaro Jambi",
    contactPerson: "Alan Dede",
    email: "alan@diskominfo.go.id",
    phone: "085267843664",
    type: "active",
    npwp: "01.234.567.8-901.000",
    totalOrders: 3,
    status: "new",
  },
  {
    id: "CUS-004",
    companyName: "PT Global Networks Indonesia",
    contactPerson: "Budi Santoso",
    email: "budi@globalnet.co.id",
    phone: "+62 811-2345-6789",
    type: "active",
    npwp: "02.345.678.9-012.000",
    totalOrders: 8,
    status: "regular",
  },
  {
    id: "CUS-005",
    companyName: "CV Mitra Teknologi Lampung",
    contactPerson: "Ibu Wulan",
    email: "wulan@mitratekno.co.id",
    phone: "+62 812-9876-5432",
    type: "prospect",
    npwp: "-",
    totalOrders: 0,
    status: "new",
  },
  {
    id: "CUS-006",
    companyName: "PT Telekomunikasi Nusantara",
    contactPerson: "Ahmad Yani",
    email: "ahmad@telkomnusa.co.id",
    phone: "021-6543210",
    type: "active",
    npwp: "03.456.789.0-123.000",
    totalOrders: 15,
    status: "vip",
  },
  {
    id: "CUS-007",
    companyName: "CV Maju Jaya Sejahtera",
    contactPerson: "Siti Aminah",
    email: "siti@majujaya.co.id",
    phone: "+62 813-4567-8901",
    type: "inactive",
    npwp: "04.567.890.1-234.000",
    totalOrders: 2,
    status: "regular",
  },
  {
    id: "CUS-008",
    companyName: "PT Digital Solutions Prima",
    contactPerson: "Rudi Hermawan",
    email: "rudi@digitalsolutions.co.id",
    phone: "+62 815-6789-0123",
    type: "prospect",
    npwp: "05.678.901.2-345.000",
    totalOrders: 0,
    status: "new",
  },
  {
    id: "CUS-009",
    companyName: "Dinas Kominfo Jambi",
    contactPerson: "Pak Camat",
    email: "camat@kominfojambi.go.id",
    phone: "+62 741-234567",
    type: "active",
    npwp: "06.789.012.3-456.000",
    totalOrders: 4,
    status: "regular",
  },
  {
    id: "CUS-010",
    companyName: "PT Skynet Indonesia",
    contactPerson: "Maria Wijaya",
    email: "maria@skynet.co.id",
    phone: "021-8901234",
    type: "active",
    npwp: "07.890.123.4-567.000",
    totalOrders: 20,
    status: "vip",
  },
];

const getTypeBadge = (type: Customer["type"]) => {
  const styles = {
    active: "bg-green-500 hover:bg-green-600",
    prospect: "bg-yellow-500 hover:bg-yellow-600",
    inactive: "bg-gray-500 hover:bg-gray-600",
  };

  const labels = {
    active: "Active",
    prospect: "Prospect",
    inactive: "Inactive",
  };

  return (
    <Badge className={styles[type]}>
      {labels[type]}
    </Badge>
  );
};

const getStatusBadge = (status: Customer["status"]) => {
  const styles = {
    vip: "bg-purple-500 hover:bg-purple-600",
    regular: "bg-blue-50 text-blue-600 border-blue-200",
    new: "bg-green-50 text-green-600 border-green-200",
  };

  const labels = {
    vip: "VIP",
    regular: "Regular",
    new: "New",
  };

  return (
    <Badge variant={status === "vip" ? "default" : "outline"} className={styles[status]}>
      {labels[status]}
    </Badge>
  );
};

export function CustomerTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 16;

  const handleView = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const handleEdit = (customerId: string) => {
    navigate(`/customers/${customerId}/edit`);
  };

  const handleDelete = (customerId: string) => {
    if (confirm(`Are you sure you want to delete customer ${customerId}?`)) {
      // Handle delete logic
      console.log("Delete customer:", customerId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[80px]">Customer ID</TableHead>
              <TableHead className="w-[250px]">Company Name</TableHead>
              <TableHead className="w-[180px]">Contact Person</TableHead>
              <TableHead className="w-[150px]">Phone Number</TableHead>
              <TableHead className="w-[120px]">Customer Type</TableHead>
              <TableHead className="w-[150px]">NPWP</TableHead>
              <TableHead className="w-[100px]">Total Orders</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCustomers.map((customer, index) => (
              <TableRow
                key={customer.id}
                className={`hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <TableCell>
                  <button
                    onClick={() => handleView(customer.id)}
                    className="text-[#3b82f6] hover:underline"
                  >
                    {customer.id}
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center text-white text-xs">
                      {customer.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-gray-900">{customer.companyName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-gray-900">{customer.contactPerson}</div>
                    <div className="text-xs text-gray-500">{customer.email}</div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-700">{customer.phone}</TableCell>
                <TableCell>{getTypeBadge(customer.type)}</TableCell>
                <TableCell className="text-gray-700">{customer.npwp}</TableCell>
                <TableCell>
                  <div>
                    <div className="text-gray-900">{customer.totalOrders}</div>
                    <div className="text-xs text-gray-500">orders</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleView(customer.id)}
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEdit(customer.id)}
                    >
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing 1-10 of 156 customers
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
          <span className="px-2 text-gray-600">...</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
