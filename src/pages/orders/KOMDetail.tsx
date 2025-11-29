import { useParams } from "react-router-dom";
import dummyKOM from "@/data/dummyKOM";
import dummyPKS from "@/data/dummyPKS";

export default function KOMDetail() {
  const { id } = useParams();
  const kom = dummyKOM.find((k) => k.id === id);

  if (!kom)
    return <div className="p-6 text-red-600">KOM not found</div>;

  const pks = dummyPKS.find((p) => p.id === kom.pksId);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">KOM Detail — {kom.id}</h1>
        <p className="text-gray-600">{kom.komDate} {kom.komTime}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left */}
        <div className="space-y-4">
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">PKS Information</h2>
            <p><strong>PKS:</strong> {kom.pksNumber}</p>
            <p><strong>Customer:</strong> {pks?.customerName}</p>
            <p><strong>Service:</strong> {pks?.serviceType}</p>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Agenda</h2>
            <p>{kom.agenda}</p>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Discussion Points</h2>
            <pre className="whitespace-pre-wrap">{kom.discussionPoints}</pre>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Decisions</h2>
            <pre className="whitespace-pre-wrap">{kom.decisions}</pre>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Location</h2>
            <p>{kom.locationType}</p>
            <p>{kom.location}</p>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Attendees</h2>
            <h3 className="font-medium">Company</h3>
            <ul className="list-disc ml-6 text-sm mb-2">
              {kom.companyAttendees.map((a) => (
                <li key={a.email}>{a.name} — {a.role}</li>
              ))}
            </ul>

            <h3 className="font-medium">Customer</h3>
            <ul className="list-disc ml-6 text-sm">
              {kom.customerAttendees.map((a) => (
                <li key={a.email}>{a.name} — {a.role}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Action Items</h2>
            <ul className="text-sm space-y-1">
              {kom.actionItems.map((item, i) => (
                <li key={i}>
                  • {item.description} — {item.assignee} (Due: {item.dueDate})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
