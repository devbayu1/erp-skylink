import { useParams, Link } from "react-router-dom";
import dummyPO from "@/data/dummyPO";
import dummyInvoices from "@/data/dummyInvoices";

export default function CustomerPODetail() {
  const { id } = useParams();
  const po = dummyPO.find((x) => x.id === id);

  if (!po) return <div className="p-6">PO not found</div>;

  // remaining balance
  const usedAmount = po.matchedInvoices.reduce(
    (sum, inv) => sum + inv.invoiceAmount,
    0
  );

  const balance = po.poValue - usedAmount;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Customer PO Detail</h1>

      {/* PO Header */}
      <div className="bg-white p-5 rounded shadow mb-5">
        <h2 className="text-lg font-bold">{po.poNumber}</h2>
        <p className="text-gray-600">Customer: {po.customerName}</p>
        <p className="text-gray-600">
          PO Value: Rp {po.poValue.toLocaleString("id-ID")}
        </p>
        <p className="text-gray-600">Remaining: Rp {balance.toLocaleString("id-ID")}</p>
        <a
          href={po.poFileUrl}
          className="text-blue-600 underline text-sm"
          target="_blank"
        >
          Download PO File
        </a>
      </div>

      {/* Matched invoices */}
      <div className="bg-white p-5 rounded shadow mb-5">
        <h3 className="font-bold mb-3">Matched Invoices</h3>

        {po.matchedInvoices.length === 0 && (
          <p className="text-gray-500 text-sm">No invoices matched</p>
        )}

        {po.matchedInvoices.map((mi) => (
          <div key={mi.invoiceId} className="border-b py-2">
            <Link
              to={`/invoices/${mi.invoiceId}`}
              className="text-blue-600 underline"
            >
              {mi.invoiceNumber}
            </Link>{" "}
            — Rp {mi.invoiceAmount.toLocaleString("id-ID")}
          </div>
        ))}
      </div>

      {/* Auto-Matching */}
      <div className="bg-white p-5 rounded shadow">
        <h3 className="font-bold mb-4">Match Invoice to PO</h3>

        {dummyInvoices.map((inv) => (
          <div key={inv.id} className="border p-3 rounded mb-3 flex justify-between">
            <div>
              <p className="font-medium">{inv.invoiceNumber}</p>
              <p className="text-sm text-gray-600">
                Amount: Rp {inv.amount.toLocaleString("id-ID")}
              </p>
            </div>

            {inv.amount > balance ? (
              <p className="text-red-600 text-sm">Exceeds PO balance</p>
            ) : (
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                Match
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
