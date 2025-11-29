import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Printer, Pencil, CheckCircle, Clock } from "lucide-react";

export default function IroDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // MOCK DATA (nanti integrasi API)
  const iro = {
    id: "IRO-001",
    status: "Pending Approval",
    customer: "PT Buana Visualnet",
    siNumber: "SI-2025-002",
    quotationNo: "PRT-JKT-QUOT-185-COM-4-2025",
    createdAt: "2025-01-18",
    requestedBy: "Rizal Saputra",
    items: [
      { id: 1, name: "Managed Service Internet", qty: 1, price: 12000000 },
      { id: 2, name: "Router Cisco 1921", qty: 2, price: 8500000 },
    ],
    approvals: [
      { name: "Finance Manager", status: "Pending", date: null },
      { name: "Operational Manager", status: "Pending", date: null },
    ],
    logs: [
      { id: 1, text: "IRO Created by Rizal", date: "2025-01-18 09:33" },
      { id: 2, text: "IRO submitted for approval", date: "2025-01-18 10:12" },
    ],
  };

  const formatCurrency = (num: number) => 
    `Rp ${num.toLocaleString("id-ID")}`;

  const totalAmount = iro.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div className="space-y-6 px-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              IRO Detail – {iro.id}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Internal Request Order linked with SI & Quotation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>

          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Download PDF
          </Button>

          <Button onClick={() => navigate(`/order-management/iro/${id}/edit`)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Main Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>IRO Information</span>
            <Badge className="bg-blue-600 text-white">{iro.status}</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-800">Customer</p>
            <p className="text-gray-600">{iro.customer}</p>
          </div>

          <div>
            <p className="font-medium text-gray-800">Requested By</p>
            <p className="text-gray-600">{iro.requestedBy}</p>
          </div>

          <div>
            <p className="font-medium text-gray-800">Site Investment (SI)</p>
            <p className="text-blue-600 underline cursor-pointer">
              {iro.siNumber}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-800">Related Quotation</p>
            <p className="text-blue-600 underline cursor-pointer">
              {iro.quotationNo}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-800">Created At</p>
            <p className="text-gray-600">{iro.createdAt}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="summary" className="mt-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="approval">Approval</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* Summary */}
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>IRO Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>This IRO is created to request approval for the selected services and equipment based on related SI and quotation.</p>

              <div className="mt-4">
                <p className="font-semibold text-gray-700">Grand Total:</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Items */}
        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left">Item Name</th>
                    <th className="px-3 py-2 text-center">Qty</th>
                    <th className="px-3 py-2 text-right">Price</th>
                    <th className="px-3 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {iro.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-3 py-3">{item.name}</td>
                      <td className="px-3 py-3 text-center">{item.qty}</td>
                      <td className="px-3 py-3 text-right">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-3 py-3 text-right">
                        {formatCurrency(item.qty * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mt-4 text-lg font-semibold">
                Total: {formatCurrency(totalAmount)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approval */}
        <TabsContent value="approval">
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {iro.approvals.map((appr, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="text-gray-800 font-semibold">{appr.name}</p>
                    <p className="text-gray-600 text-sm">
                      Status: {appr.status}
                    </p>
                  </div>

                  {appr.status === "Pending" ? (
                    <Clock className="text-orange-500 w-6 h-6" />
                  ) : (
                    <CheckCircle className="text-green-600 w-6 h-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {iro.logs.map((log) => (
                  <li key={log.id} className="border p-3 rounded-lg">
                    <p>{log.text}</p>
                    <span className="text-gray-500 text-xs">{log.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
