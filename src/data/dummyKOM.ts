const dummyKOM = [
  {
    id: "KOM-001",
    pksId: "PKS-001",
    pksNumber: "PKS-2025-0001",

    komDate: "2025-12-05",
    komTime: "10:00",

    locationType: "Customer Site",
    location: "Jl. Melati No. 25, Jakarta Selatan",
    meetingLink: "",

    agenda: "Project scope confirmation, installation timeline, deliverables.",

    companyAttendees: [
      { name: "Amirullah Kumaini", role: "Project Manager", email: "amir@example.com" },
      { name: "Sarah Nur", role: "Technical Lead", email: "sarah@example.com" },
    ],

    customerAttendees: [
      { name: "Budi Hartono", role: "IT Manager", email: "budi@client.com" },
    ],

    discussionPoints: "- Confirmed technical requirements\n- Delivery target 14 days",
    decisions: "- Install equipment on 12 December\n- Customer provides electrical access",

    actionItems: [
      { description: "Prepare installation team", assignee: "Sarah Nur", dueDate: "2025-12-10", status: "Pending" },
    ],

    status: "Scheduled",
    attachments: ["kom-agenda.pdf"],
  },
];

export default dummyKOM;
