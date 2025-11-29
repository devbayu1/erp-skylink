import dummyDeployments from "@/data/dummyDeployment";
import type { DeploymentReport } from "@/types/deployment";
import { updatePKSStatus } from "@/services/pksService"; 

const DEPLOY_DB: DeploymentReport[] = dummyDeployments as DeploymentReport[];

export function listDeployments() {
  return DEPLOY_DB;
}

export function getDeployment(id: string) {
  return DEPLOY_DB.find((d) => d.id === id);
}

export function createDeployment(payload: Partial<DeploymentReport>) {
  const id = `DEP-${Date.now()}`;

  const newRecord: DeploymentReport = {
    id,
    iwoId: payload.iwoId!,
    iwoNumber: payload.iwoNumber!,
    pksId: payload.pksId!,
    pksNumber: payload.pksNumber!,
    customerName: payload.customerName!,
    serviceLocation: payload.serviceLocation!,
    deviceSerial: payload.deviceSerial!,
    macAddress: payload.macAddress!,
    installationDate: payload.installationDate!,
    technicianName: payload.technicianName!,
    notes: payload.notes || "",
    photos: payload.photos || [],
    speedtest: payload.speedtest,
    status: "Submitted",
    createdAt: new Date().toISOString(),
  };

  DEPLOY_DB.unshift(newRecord);
  return newRecord;
}

export function verifyDeployment(id: string) {
  const d = getDeployment(id);
  if (!d) return;

  d.status = "Live";

  // Auto update PKS status
  updatePKSStatus(d.pksId, "Active");

  return d;
}

export function rejectDeployment(id: string, note: string) {
  const d = getDeployment(id);
  if (!d) return;

  d.status = "Rejected";
  d.notes = note;

  return d;
}
