const dummySLALogs = [
  {
    id: "LOG-001",
    slaId: "SLA-001",
    date: "2025-11-03",
    durationMinutes: 10,
    description: "Intermittent connectivity due to provider maintenance.",
    severity: "Medium",
    resolvedBy: "NOC Team",
    status: "Resolved",
  },
  {
    id: "LOG-002",
    slaId: "SLA-001",
    date: "2025-11-12",
    durationMinutes: 20,
    description: "Power outage at customer site.",
    severity: "High",
    resolvedBy: "On-site Engineer",
    status: "Resolved",
  },
];

export default dummySLALogs;
