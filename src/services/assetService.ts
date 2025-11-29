// src/services/assetService.ts
import dummyAssets from "@/data/dummyAssets";
import type { AssetRegistration, AssetItem } from "@/types/asset";

const ASSETS = dummyAssets;

export function listAssetRegistrations(): AssetRegistration[] {
  return ASSETS;
}

export function getAssetRegistration(id: string): AssetRegistration | undefined {
  return ASSETS.find(a => a.id === id);
}

export function createAssetRegistration(payload: Partial<AssetRegistration>): AssetRegistration {
  const now = new Date().toISOString().slice(0,10);
  const id = payload.id || `ASIN-${Date.now()}`;
  const assetNumber = payload.assetNumber || `ASIN-${Date.now()}`;
  const items = payload.items || [];
  const totalQty = items.reduce((s: number, it: AssetItem) => s + (it.qty || 0), 0);

  const newItem: AssetRegistration = {
    id,
    assetNumber,
    createdAt: now,
    createdBy: payload.createdBy || "current.user",
    povId: payload.povId,
    povNumber: payload.povNumber,
    grnId: payload.grnId,
    grnNumber: payload.grnNumber,
    receivedDate: payload.receivedDate || now,
    receivedFrom: payload.receivedFrom || "",
    receiverName: payload.receiverName,
    items,
    totalQty,
    status: payload.status || "Pending",
    notes: payload.notes || "",
  };

  ASSETS.unshift(newItem);
  return newItem;
}

export function updateAssetRegistration(id: string, payload: Partial<AssetRegistration>): AssetRegistration | undefined {
  const idx = ASSETS.findIndex(a => a.id === id);
  if (idx === -1) return undefined;

  const merged = { ...ASSETS[idx], ...payload };

  // recalc totalQty if items changed
  if (payload.items) {
    merged.totalQty = payload.items.reduce((s: number, it: AssetItem) => s + (it.qty || 0), 0);
  }

  ASSETS[idx] = merged;
  return merged;
}
