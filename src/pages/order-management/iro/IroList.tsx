import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Plus, FileText, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IroList() {
  const navigate = useNavigate();

  const mockIro = [
    {
      id: "IRO-001",
      requester: "PT Buana Visualnet",
      date: "2025-01-11",
      status: "Pending Approval",
      total: 55000000,
    },
    {
      id: "IRO-002",
      requester: "Diskominfo Muaro",
      date: "2025-01-15",
      status: "Approved",
      total: 32000000,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Internal Request Order (IRO)</h1>
          <p className="text-sm text-gray-600">Manage internal requests across departments</p>
        </div>
        <Button onClick={() => navigate("/order-management/iro/new")}>
          <Plus className="w-4 h-4 mr-2" />
          New IRO
        </Button>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3 items-center">
            <input
              placeholder="Search IRO / Customer..."
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>List IRO</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IRO No</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mockIro.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold">{item.id}</TableCell>
                    <TableCell>{item.requester}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600">
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>Rp {item.total.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/order-management/iro/${item.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/order-management/iro/${item.id}/print`)}
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
    </div>
  );
}
