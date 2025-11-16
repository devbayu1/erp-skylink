import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const deployments = [
  { id: "PRJ-001", name: "PT. Maju Jaya - Installation", progress: 75, status: "on-track" },
  { id: "PRJ-002", name: "CV. Sentosa - Setup", progress: 60, status: "at-risk" },
  { id: "PRJ-003", name: "PT. Global Tech - Migration", progress: 90, status: "on-track" },
];

export function DeploymentProgress() {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Deployment Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">{deployment.name}</div>
                  <div className="text-sm text-gray-600">{deployment.id}</div>
                </div>
                <span className="text-gray-900">{deployment.progress}%</span>
              </div>
              <Progress 
                value={deployment.progress} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
