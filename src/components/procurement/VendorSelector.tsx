import { listVendors } from "@/services/procurementService";

export default function VendorSelector({ value, onChange }) {
  const vendors = listVendors();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full"
    >
      <option value="">-- choose vendor --</option>
      {vendors.map((v) => (
        <option key={v.id} value={v.id}>
          {v.name}
        </option>
      ))}
    </select>
  );
}
