import { useParams } from "react-router-dom";
import dummyBAST from "@/data/dummyBAST";

export default function BASTDetail() {
  const { id } = useParams();
  const bast = dummyBAST.find((b) => b.id === id);

  if (!bast) return <div className="p-6 text-red-500">BAST not found.</div>;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">BAST Detail</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-3">
        <p><strong>BAST Number:</strong> {bast.bastNumber}</p>
        <p><strong>Date:</strong> {bast.bastDate}</p>

        <hr />

        <p><strong>Customer:</strong> {bast.customerName}</p>
        <p><strong>Service:</strong> {bast.serviceType}</p>
        <p><strong>Location:</strong> {bast.serviceLocation}</p>

        <hr />

        <p><strong>Installation Notes:</strong> {bast.installationNotes}</p>
        <p><strong>Test Result:</strong> {bast.testResult}</p>

        <hr />

        <p><strong>Engineer:</strong> {bast.engineerName}</p>
        <p><strong>Customer PIC:</strong> {bast.customerPIC}</p>

        <hr />

        <p><strong>Status:</strong> {bast.status}</p>
      </div>
    </div>
  );
}
