import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Plus, FileText, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderManagementPage() {
  const navigate = useNavigate();

  const mockOrders = [
    {
      id: "IRO-001",
      customer: "PT Buana Visualnet",
      siNumber: "SI-2025-002",
      quotationNo: "PRT-JKT-QUOT-185-COM-4-2025",
      status: "Pending Approval",
      createdAt: "2025-01-18",
    },
    {
      id: "IRO-002",
      customer: "Diskominfo Muaro Jambi",
      siNumber: "SI-2025-003",
      quotationNo: "PRT-JKT-QUOT-183-COM-3-2025",
      status: "Created",
      createdAt: "2025-01-20",
    },
    {
      id: "IRO-003",
      customer: "PT Global Networks",
      siNumber: "SI-2025-004",
      quotationNo: "PRT-JKT-QUOT-182-COM-3-2025",
      status: "Approved",
      createdAt: "2025-01-22",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management (IRO)</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage Internal Request Orders linked with SI & Quotations
          </p>
        </div>
        <Button onClick={() => navigate("/order-management/new")}> 
          <Plus className="w-4 h-4 mr-2" />
          Create New IRO
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                placeholder="Search IRO, Customer or SI..."
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Internal Request Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IRO Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>SI Number</TableHead>
                  <TableHead>Quotation No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.siNumber}</TableCell>
                    <TableCell>{order.quotationNo}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => navigate(`/order-management/${order.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => navigate(`/order-management/${order.id}/print`)}
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
        <p>Showing 1-3 of 3 IRO</p>
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
    </div>
  );
}
