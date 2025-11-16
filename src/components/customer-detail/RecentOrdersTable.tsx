import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { RecentOrder } from "../../types/customerDetail";

const mockRecentOrders: RecentOrder[] = [
  {
    id: "IRO-001",
    date: "Oct 15, 2025",
    service: "Priority 2TB",
    amount: "Rp 21,600,000",
    status: "active",
  },
  {
    id: "IRO-002",
    date: "Sep 20, 2025",
    service: "Standard 1TB",
    amount: "Rp 10,800,000",
    status: "completed",
  },
  {
    id: "IRO-003",
    date: "Aug 12, 2025",
    service: "Premium 5TB",
    amount: "Rp 54,000,000",
    status: "completed",
  },
  {
    id: "IRO-004",
    date: "Jul 05, 2025",
    service: "Standard 500GB",
    amount: "Rp 5,400,000",
    status: "completed",
  },
  {
    id: "IRO-005",
    date: "Jun 18, 2025",
    service: "Priority 1TB",
    amount: "Rp 12,960,000",
    status: "completed",
  },
];

const getStatusBadge = (status: RecentOrder["status"]) => {
  const styles = {
    active: "bg-green-500 hover:bg-green-600",
    completed: "bg-blue-500 hover:bg-blue-600",
    pending: "bg-yellow-500 hover:bg-yellow-600",
    cancelled: "bg-red-500 hover:bg-red-600",
  };

  const labels = {
    active: "Active",
    completed: "Completed",
    pending: "Pending",
    cancelled: "Cancelled",
  };

  return <Badge className={styles[status]}>{labels[status]}</Badge>;
};

export function RecentOrdersTable() {
  const navigate = useNavigate();

  return (
    <Card className="bg-white shadow-sm rounded-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900">Recent Orders</CardTitle>
          <button
            onClick={() => navigate("/orders")}
            className="text-[#3b82f6] hover:underline text-sm"
          >
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRecentOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell>
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="text-[#3b82f6] hover:underline"
                  >
                    {order.id}
                  </button>
                </TableCell>
                <TableCell className="text-gray-700">{order.date}</TableCell>
                <TableCell className="text-gray-900">{order.service}</TableCell>
                <TableCell className="text-gray-900">{order.amount}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
