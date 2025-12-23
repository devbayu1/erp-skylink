import { Link, useParams } from "react-router-dom";
import dummyKOM from "@/data/dummyKOM";
import dummyPKS from "@/data/dummyPKS";
import { ChevronRight, FileInput, ArrowRight } from "lucide-react"; // Import Icon tambahan
import { Button } from "@/components/ui/button"; // Import component Button

export default function KOMDetail() {
  const { id } = useParams();
  const kom = dummyKOM.find((k) => k.id === id);

  if (!kom) return <div className="p-6 text-red-600">KOM not found</div>;

  const pks = dummyPKS.find((p) => p.id === kom.pksId);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER: Updated to Flex for Button Placement */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">KOM Detail — {kom.id}</h1>
          <p className="text-gray-600">
            {kom.komDate} {kom.komTime}
          </p>
        </div>

        {/* TOMBOL NEXT ACTION: Generate IRO */}
        <Link to={`/orders/iro/new?komId=${kom.id}`}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <FileInput className="w-4 h-4 mr-2" />
            Generate IRO
            <ArrowRight className="w-4 h-4 ml-2 opacity-70" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left */}
        <div className="space-y-4">
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">PKS Information</h2>
            <p>
              <strong>PKS:</strong> {kom.pksNumber}
            </p>
            <p>
              <strong>Customer:</strong> {pks?.customerName}
            </p>
            <p>
              <strong>Service:</strong> {pks?.serviceType}
            </p>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Agenda</h2>
            <p>{kom.agenda}</p>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Discussion Points</h2>
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{kom.discussionPoints}</pre>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Decisions</h2>
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{kom.decisions}</pre>
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
            <h3 className="font-medium text-gray-700 mt-2">Company</h3>
            <ul className="list-disc ml-6 text-sm mb-4 space-y-1">
              {kom.companyAttendees.map((a) => (
                <li key={a.email}>
                  <span className="font-medium">{a.name}</span> — <span className="text-gray-500">{a.role}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-medium text-gray-700">Customer</h3>
            <ul className="list-disc ml-6 text-sm space-y-1">
              {kom.customerAttendees.map((a) => (
                <li key={a.email}>
                  <span className="font-medium">{a.name}</span> — <span className="text-gray-500">{a.role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Action Items</h2>
            <ul className="text-sm space-y-2">
              {kom.actionItems.map((item, i) => (
                <li key={i} className="bg-gray-50 p-2 rounded border border-gray-100">
                  <div className="font-medium text-gray-900">{item.description}</div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Assignee: {item.assignee}</span>
                    <span className="text-orange-600">Due: {item.dueDate}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
