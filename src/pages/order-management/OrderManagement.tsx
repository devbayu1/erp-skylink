import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClipboardList, FileText, ShoppingCart, Truck } from "lucide-react";

export default function OrderManagementPage() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Internal Request Order (IRO)",
      description: "Create and manage IRO linked with SI & Quotation",
      icon: ClipboardList,
      path: "/order-management/iro",
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Purchase Request Form (PRF)",
      description: "Request procurement items for vendor processing",
      icon: ShoppingCart,
      path: "/order-management/prf",
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Purchase Order Vendor (POV)",
      description: "Generate official purchase order for vendors",
      icon: FileText,
      path: "/order-management/pov",
      color: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <div className="px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1 text-sm">
          Handle administrative processes related to sales orders, purchase requests, and vendor purchase orders.
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card
              key={idx}
              className="cursor-pointer hover:shadow-md transition-all border border-gray-200"
              onClick={() => navigate(item.path)}
            >
              <CardHeader className="flex flex-row items-center gap-3">
                <div className={`p-3 rounded-lg ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                {item.description}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Sections (Admin List / PKS / Initial Payment) */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Additional Administration</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="cursor-pointer hover:shadow-md transition-all border border-gray-200"
            onClick={() => navigate("/order-management/admin-list")}
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                <ClipboardList className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">Admin Penjualan (IRO/PO)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Manage administrative workflow for sales orders.
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all border border-gray-200"
            onClick={() => navigate("/order-management/contract-pks")}
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                <Truck className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">Manajemen Kontrak (PKS)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Handle contract creation, approval and monitoring.
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all border border-gray-200"
            onClick={() => navigate("/order-management/initial-payment")}
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-3 rounded-lg bg-red-50 text-red-600">
                <FileText className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">Administrasi Pembayaran Awal</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Manage initial payments and their approval flow.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}