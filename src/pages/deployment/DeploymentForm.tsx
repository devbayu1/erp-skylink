import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeployment } from "@/services/deploymentService";

export default function DeploymentForm() {
  const nav = useNavigate();

  const [data, setData] = useState({
    iwoId: "",
    iwoNumber: "",
    pksId: "",
    pksNumber: "",
    customerName: "",
    serviceLocation: "",
    deviceSerial: "",
    macAddress: "",
    installationDate: "",
    technicianName: "",
    notes: "",
  });

  const save = () => {
    createDeployment(data);
    alert("Installation report submitted!");
    nav("/deployment");
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-xl font-bold mb-4">Submit Installation Report</h1>

      <div className="space-y-3 bg-white p-6 rounded shadow">

        <input className="border p-2 w-full" placeholder="IWO Number"
          value={data.iwoNumber} onChange={e=>setData({...data, iwoNumber:e.target.value})} />

        <input className="border p-2 w-full" placeholder="Customer"
          value={data.customerName} onChange={e=>setData({...data, customerName:e.target.value})} />

        <input className="border p-2 w-full" placeholder="Location"
          value={data.serviceLocation} onChange={e=>setData({...data, serviceLocation:e.target.value})} />

        <input className="border p-2 w-full" placeholder="Device Serial" 
          value={data.deviceSerial} onChange={e=>setData({...data, deviceSerial:e.target.value})} />

        <input className="border p-2 w-full" placeholder="MAC Address"
          value={data.macAddress} onChange={e=>setData({...data, macAddress:e.target.value})} />

        <input type="date" className="border p-2 w-full"
          value={data.installationDate} onChange={e=>setData({...data, installationDate:e.target.value})} />

        <textarea className="border p-2 w-full" placeholder="Notes"
          value={data.notes} onChange={e=>setData({...data, notes:e.target.value})} />

        <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit Report
        </button>

      </div>
    </div>
  );
}
