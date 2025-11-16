import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

const approvals = [
  { id: "SI #001", type: "Sales Invoice", requester: "Sarah Wilson", date: "Nov 15, 2025" },
  { id: "IRO #023", type: "Inventory Request", requester: "Mike Johnson", date: "Nov 15, 2025" },
  { id: "ARF #045", type: "Advance Request", requester: "Lisa Chen", date: "Nov 14, 2025" },
  { id: "PO #067", type: "Purchase Order", requester: "Tom Davis", date: "Nov 14, 2025" },
  { id: "QT #089", type: "Quotation", requester: "Emily Brown", date: "Nov 13, 2025" },
  { id: "SI #012", type: "Sales Invoice", requester: "David Lee", date: "Nov 13, 2025" },
];

export function PendingApprovals() {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {approvals.map((approval) => (
            <div key={approval.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="text-gray-900">{approval.id}</div>
                <div className="text-sm text-gray-600">
                  {approval.type} • {approval.requester}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-green-500 hover:bg-green-600 h-8 px-3">
                  <Check className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" className="h-8 px-3">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
