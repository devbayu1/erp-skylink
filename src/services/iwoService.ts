import dummyIWO from "@/data/dummyIWO";
import type { IWORecord } from "@/types/iwo";
import { createMovement } from "@/services/movementService";

const IWO_DB: IWORecord[] = dummyIWO as IWORecord[];

export function listIWO() {
  return IWO_DB;
}

export function getIWO(id: string) {
  return IWO_DB.find((i) => i.id === id);
}

export function createIWO(payload: Partial<IWORecord>): IWORecord {
  const id = payload.id || `IWO-${Date.now()}`;
  const iwoNumber = payload.iwoNumber || `IWO-${Date.now()}`;
  const date = payload.date || new Date().toISOString().slice(0, 10);

  const newRecord: IWORecord = {
    id,
    iwoNumber,
    date,
    pksId: payload.pksId,
    pksNumber: payload.pksNumber,
    customerName: payload.customerName,
    serviceLocation: payload.serviceLocation,
    technicianName: payload.technicianName,
    scheduledDate: payload.scheduledDate,
    remarks: payload.remarks,
    status: payload.status || "Pending Approval",
    items: payload.items || [],
    createdBy: "current.user",
  };

  IWO_DB.unshift(newRecord);
  return newRecord;
}

export function updateIWO(id: string, payload: Partial<IWORecord>) {
  const idx = IWO_DB.findIndex((i) => i.id === id);
  if (idx === -1) return;

  IWO_DB[idx] = { ...IWO_DB[idx], ...payload };
  return IWO_DB[idx];
}

/**
 * On IWO Approval: auto-create Movement OUT
 */
export function approveIWO(id: string) {
  const iwo = getIWO(id);
  if (!iwo) return;

  iwo.status = "Approved";

  // Automatically create Movement OUT
  createMovement({
    type: "OUT",
    status: "Completed",
    date: new Date().toISOString().slice(0, 10),
    referenceType: "IWO",
    referenceId: iwo.id,
    referenceNumber: iwo.iwoNumber,
    fromLocation: "WH-JKT-R1",
    toLocation: iwo.serviceLocation,
    items: iwo.items,
    notes: `Auto Movement OUT generated from IWO ${iwo.iwoNumber}`,
  });

  return iwo;
}

export function completeIWO(id: string) {
  const iwo = getIWO(id);
  if (!iwo) return;
  iwo.status = "Completed";
  return iwo;
}
