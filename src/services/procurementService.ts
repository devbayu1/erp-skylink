// src/services/procurementService.ts
import dummyMGRF from "@/data/dummyMGRF";
import dummyPRF from "@/data/dummyPRF";
import dummyARF from "@/data/dummyARF";
import dummyGIF from "@/data/dummyGIF";
import dummyPOV from "@/data/dummyPOV";
import dummyVendors from "@/data/dummyVendors";
import dummyGRN from "@/data/dummyGRN";

import type { MGRF, PRF, ARF, GIF, LineItem, GRN } from "@/types/procurement";

export const MGRFs = dummyMGRF;
export const PRFs = dummyPRF;
export const ARFs = dummyARF;
export const GIFs = dummyGIF;

/* MGRF */
export function listMGRF(): MGRF[] { return MGRFs; }
export function getMGRF(id: string) { return MGRFs.find(x => x.id === id); }
export function createMGRF(payload: Partial<MGRF>) {
  const newItem: MGRF = {
    id: `MGRF-${Date.now()}`,
    mgrfNumber: payload.mgrfNumber || `MGRF-${Date.now()}`,
    iroId: payload.iroId,
    createdBy: payload.createdBy || "current.user",
    createdAt: new Date().toISOString().slice(0,10),
    neededByDate: payload.neededByDate,
    purpose: payload.purpose || "",
    items: payload.items || [],
    totalEstimate: (payload.items || []).reduce((s: number, i: LineItem) => s + (i.estimateUnitPrice || 0) * i.qty, 0),
    status: payload.status || "Draft",
    notes: payload.notes
  };
  MGRFs.unshift(newItem);
  return newItem;
}
export function updateMGRF(id: string, payload: Partial<MGRF>) {
  const idx = MGRFs.findIndex(x => x.id === id);
  if (idx === -1) return;
  MGRFs[idx] = { ...MGRFs[idx], ...payload };
  return MGRFs[idx];
}

/* PRF */
export function listPRF(): PRF[] { return PRFs; }
export function getPRF(id: string) { return PRFs.find(x => x.id === id); }
export function createPRF(payload: Partial<PRF>) {
  const newItem: PRF = {
    id: `PRF-${Date.now()}`,
    prfNumber: payload.prfNumber || `PRF-${Date.now()}`,
    mgrfId: payload.mgrfId,
    createdBy: payload.createdBy || "procurement.user",
    createdAt: new Date().toISOString().slice(0,10),
    vendorPreferred: payload.vendorPreferred,
    items: payload.items || [],
    totalEstimate: (payload.items || []).reduce((s: number, i: LineItem) => s + (i.estimateUnitPrice || 0) * i.qty, 0),
    status: payload.status || "Draft",
    approvalNotes: payload.approvalNotes
  };
  PRFs.unshift(newItem);
  return newItem;
}
export function updatePRF(id: string, payload: Partial<PRF>) {
  const idx = PRFs.findIndex(x => x.id === id);
  if (idx === -1) return;
  PRFs[idx] = { ...PRFs[idx], ...payload };
  return PRFs[idx];
}

/* ARF */
export function listARF() {
  return dummyARF;
}

export function getARF(id: string) {
  return dummyARF.find((a) => a.id === id);
}

export function createARF(payload: any) {
  const newItem = {
    id: "ARF-" + Date.now(),
    arfNumber: "ARF-" + Date.now(),
    createdAt: new Date().toISOString(),
    ...payload,
  };
  dummyARF.push(newItem);
  return newItem;
}

export function updateARF(id: string, payload: any) {
  const idx = dummyARF.findIndex((a) => a.id === id);
  if (idx !== -1) {
    dummyARF[idx] = { ...dummyARF[idx], ...payload };
  }
}

/* GIF */
export function listGIF() {
  return dummyGIF;
}

export function getGIF(id: string) {
  return dummyGIF.find((g) => g.id === id);
}

export function createGIF(payload: any) {
  const newItem = {
    id: "GIF-" + Date.now(),
    gifNumber: "GIF-" + Date.now(),
    createdAt: new Date().toISOString(),
    ...payload,
  };
  dummyGIF.push(newItem);
  return newItem;
}

export function updateGIF(id: string, payload: any) {
  const idx = dummyGIF.findIndex((g) => g.id === id);
  if (idx !== -1) {
    dummyGIF[idx] = { ...dummyGIF[idx], ...payload };
  }
}

export function listPOV() {
  return dummyPOV;
}

export function getPOV(id: string) {
  return dummyPOV.find((p) => p.id === id);
}

export function listVendors() {
  return dummyVendors;
}

export function createPOV(payload: any) {
  const newItem = {
    id: "POV-" + Date.now(),
    povNumber: "POV-" + Date.now(),
    createdAt: new Date().toISOString(),
    ...payload,
  };
  dummyPOV.push(newItem);
  return newItem;
}

export function updatePOV(id: string, payload: any) {
  const idx = dummyPOV.findIndex((p) => p.id === id);
  if (idx !== -1) dummyPOV[idx] = { ...dummyPOV[idx], ...payload };
}

export const GRNs: GRN[] = dummyGRN.map(g => ({
  ...g,
  status: g.status as GRN["status"]
}));


export function listGRN(): GRN[] {
  return GRNs;
}

export function getGRN(id: string): GRN | undefined {
  return GRNs.find((g) => g.id === id);
}

export function createGRN(payload: Partial<GRN>): GRN {
  const newItem: GRN = {
    id: payload.id || `GRN-${Date.now()}`,
    grnNumber: payload.grnNumber || `GRN-${Date.now()}`,
    createdAt: new Date().toISOString().slice(0,10),
    povId: payload.povId,
    povNumber: payload.povNumber,
    gifId: payload.gifId,
    gifNumber: payload.gifNumber,
    receivedBy: payload.receivedBy || "warehouse.user",
    receivedDate: payload.receivedDate || new Date().toISOString().slice(0,10),
    receiverName: payload.receiverName,
    receivedFrom: payload.receivedFrom || "",
    items: payload.items || [],
    attachments: payload.attachments || [],
    notes: payload.notes || "",
    status: payload.status || "Pending",
  };
  GRNs.unshift(newItem);
  return newItem;
}

export function updateGRN(id: string, payload: Partial<GRN>): GRN | undefined {
  const idx = GRNs.findIndex((g) => g.id === id);
  if (idx === -1) return undefined;
  GRNs[idx] = { ...GRNs[idx], ...payload };
  return GRNs[idx];
}