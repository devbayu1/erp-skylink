import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

export default function IroForm() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Internal Request Order</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Requester</label>
            <Input placeholder="PT Example" />
          </div>

          <div>
            <label className="text-sm font-medium">Date</label>
            <Input type="date" />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea placeholder="Describe the request..." />
          </div>

          <Button className="w-full mt-4">Save IRO</Button>
          <Button variant="outline" className="w-full mt-2" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
