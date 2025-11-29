import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import dummyIRO from "@/data/dummyIRO";
import dummyQuotations from "@/data/dummyQuotations";
import dummySI from "@/data/dummySI";

const formatCurrency = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function IROList() {
  const [search, setSearch] = useState("");

  const filtered = dummyIRO.filter((item) =>
    item.customerName.toLowerCase().includes(search.toLowerCase()) ||
    item.iroNumber.toLowerCase().includes(search.toLowerCase()) ||
    item.quotationNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Internal Request Order (IRO)</h1>
          <p className="text-gray-600 text-sm">
            Manage Internal Request Orders linked with Quotation & SI
          </p>
        </div>

        {/* Create New → use new route */}
        <Link
          to="/orders/iro/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <Plus size={16} /> Create New IRO
        </Link>
      </div>

      {/* SEARCH */}
      <div className="mb-4 flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by IRO, customer, quotation..."
          className="border px-3 py-2 rounded w-96"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">IRO Number</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Quotation</th>
              <th className="p-3 text-left">SI</th>
              <th className="p-3 text-right">Total Budget</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row) => {
              const quotation = dummyQuotations.find((q) => q.id === row.quotationId);
              const si = dummySI.find((s) => s.id === row.siId);

              return (
                <tr key={row.id} className="border-t">
                  
                  {/* IRO NUMBER → detail route fixing */}
                  <td className="p-3">
                    <Link
                      to={`/orders/iro/${row.id}`}
                      className="text-blue-600 font-medium underline"
                    >
                      {row.iroNumber}
                    </Link>
                  </td>

                  <td className="p-3">{row.iroDate}</td>

                  <td className="p-3">{row.customerName}</td>

                  {/* QUOTATION */}
                  <td className="p-3">
                    {quotation ? (
                      <Link
                        to={`/quotations/${quotation.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {quotation.quotationNo}
                      </Link>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>

                  {/* SI */}
                  <td className="p-3">
                    {si ? (
                      <Link
                        to={`/sales/si/${si.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {si.siNumber}
                      </Link>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    {formatCurrency(row.totalBudget)}
                  </td>

                  <td className="p-3">{row.paymentType}</td>

                  {/* STATUS BADGE */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        row.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : row.status === "Draft"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`/orders/iro/${row.id}`}>
                        <Eye className="w-4 h-4 text-blue-600" />
                      </Link>

                      <Link to={`/orders/iro/${row.id}/edit`}>
                        <Edit className="w-4 h-4 text-gray-700" />
                      </Link>

                      <button onClick={() => alert("delete " + row.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
