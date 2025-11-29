import { useParams, useNavigate } from "react-router-dom";
import dummyPKS from "@/data/dummyPKS";

export default function KOMForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pks = dummyPKS.find((p) => p.id === id);

  if (!pks)
    return <div className="p-6 text-red-600">PKS not found</div>;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">
        Schedule KOM — {pks.pksNumber}
      </h1>

      <div className="bg-white p-6 shadow rounded-lg space-y-4">
        {/* Date */}
        <div>
          <label className="font-medium">Meeting Date</label>
          <input type="date" className="border p-2 rounded w-full mt-1" />
        </div>

        {/* Time */}
        <div>
          <label className="font-medium">Meeting Time</label>
          <input type="time" className="border p-2 rounded w-full mt-1" />
        </div>

        {/* Location */}
        <div>
          <label className="font-medium">Location Type</label>
          <select className="border p-2 rounded w-full mt-1">
            <option>Office</option>
            <option>Customer Site</option>
            <option>Online Meeting</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Location / Meeting Link</label>
          <input className="border p-2 rounded w-full mt-1" placeholder="Address or meeting URL" />
        </div>

        {/* Agenda */}
        <div>
          <label className="font-medium">Agenda</label>
          <textarea className="border p-2 rounded w-full mt-1 h-24" />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate(`/pks/${pks.id}`)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("KOM scheduled (mock)");
              navigate("/kom");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Schedule KOM
          </button>
        </div>
      </div>
    </div>
  );
}
