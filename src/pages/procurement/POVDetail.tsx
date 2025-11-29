import { useParams, Link } from "react-router-dom";
import { getPOV } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";
import { RequestStatus } from "@/types/procurement";

export default function POVDetail() {
  const { id } = useParams();
  const data = id ? getPOV(id) : undefined;

  if (!data) return <div className="p-6">POV not found</div>;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{data.povNumber}</h1>
          <p className="text-gray-600 text-sm">Purchase Order Vendor</p>
        </div>

        <Link to={`/procurement/pov/${data.id}/edit`} className="px-3 py-2 border rounded">
          Edit
        </Link>
      </div>

      {/* Vendor + ARF */}
      <div className="bg-white p-4 shadow rounded space-y-2">
        <div><b>Vendor:</b> {data.vendorName}</div>
        <div><b>ARF Ref:</b> {data.arfNumber}</div>
        <div><b>Status:</b> <RequestStatusBadge status={data.status as RequestStatus} /></div>
      </div>

      {/* Items */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-semibold mb-2">Items</h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-left">Unit</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.name}</td>
                <td className="p-2 text-right">{i.qty}</td>
                <td className="p-2">{i.unit}</td>
                <td className="p-2 text-right">Rp {i.price.toLocaleString("id-ID")}</td>
                <td className="p-2 text-right">Rp {i.total.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="bg-white p-4 shadow rounded text-sm">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <b>Rp {data.subTotal.toLocaleString("id-ID")}</b>
        </div>

        <div className="flex justify-between">
          <span>PPN 10%</span>
          <b>Rp {data.tax.toLocaleString("id-ID")}</b>
        </div>

        <div className="flex justify-between text-lg border-t pt-2 mt-2">
          <span>Grand Total</span>
          <b>Rp {data.grandTotal.toLocaleString("id-ID")}</b>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Notes</h2>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
}
