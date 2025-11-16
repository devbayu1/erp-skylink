import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const invoices = [
  { id: "INV-001", customer: "PT. Maju Jaya", amount: "Rp 450,000", dueDate: "Nov 20, 2025", status: "overdue" },
  { id: "INV-002", customer: "CV. Sentosa", amount: "Rp 320,000", dueDate: "Nov 22, 2025", status: "due-soon" },
  { id: "INV-003", customer: "PT. Global Tech", amount: "Rp 680,000", dueDate: "Nov 18, 2025", status: "overdue" },
  { id: "INV-004", customer: "UD. Berkah", amount: "Rp 210,000", dueDate: "Nov 25, 2025", status: "normal" },
  { id: "INV-005", customer: "PT. Sejahtera", amount: "Rp 540,000", dueDate: "Nov 28, 2025", status: "normal" },
];

export function OutstandingInvoices() {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Outstanding Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-900">{invoice.customer}</span>
                  {invoice.status === "overdue" && (
                    <Badge variant="destructive" className="text-xs">Overdue</Badge>
                  )}
                  {invoice.status === "due-soon" && (
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-600 border-orange-200">Due Soon</Badge>
                  )}
                </div>
                <span className="text-sm text-gray-600">{invoice.id}</span>
              </div>
              <div className="text-right">
                <div className="text-gray-900">{invoice.amount}</div>
                <div className="text-sm text-gray-600">{invoice.dueDate}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
