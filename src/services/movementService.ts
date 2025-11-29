// src/services/movementService.ts
import dummyMovements from "@/data/dummyMovements";
import type { MovementRecord, MovementItem } from "@/types/movement";

const MOVEMENTS = dummyMovements as MovementRecord[];

export function listMovements(): MovementRecord[] {
  return MOVEMENTS;
}

export function getMovement(id: string): MovementRecord | undefined {
  return MOVEMENTS.find(m => m.id === id);
}

export function createMovement(payload: Partial<MovementRecord>): MovementRecord {
  const now = new Date().toISOString().slice(0,10);
  const id = payload.id || `MOV-${Date.now()}`;
  const movementNo = payload.movementNo || `MOV-${Date.now()}`;
  const items: MovementItem[] = payload.items || [];

  const newRec: MovementRecord = {
    id,
    movementNo,
    type: (payload.type as any) || "IN",
    status: payload.status || "Draft",
    date: payload.date || now,
    referenceType: payload.referenceType,
    referenceId: payload.referenceId,
    referenceNumber: payload.referenceNumber,
    fromLocation: payload.fromLocation,
    toLocation: payload.toLocation,
    createdBy: payload.createdBy || "current.user",
    notes: payload.notes || "",
    items,
  };

  MOVEMENTS.unshift(newRec);
  return newRec;
}

export function updateMovement(id: string, payload: Partial<MovementRecord>): MovementRecord | undefined {
  const idx = MOVEMENTS.findIndex(m => m.id === id);
  if (idx === -1) return undefined;
  MOVEMENTS[idx] = { ...MOVEMENTS[idx], ...payload };
  return MOVEMENTS[idx];
}

export function completeMovement(id: string): MovementRecord | undefined {
  const m = getMovement(id);
  if (!m) return undefined;
  m.status = "Completed";
  // NOTE: in real app: adjust inventory stock here
  return m;
}
