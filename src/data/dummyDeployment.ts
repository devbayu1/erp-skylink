const dummyDeployments = [
  {
    id: "DEP-001",
    iwoId: "IWO-001",
    iwoNumber: "IWO-2025-0001",
    pksId: "PKS-001",
    pksNumber: "PKS-2025-0001",

    customerName: "PT Buana Visualnet Sentra",
    serviceLocation: "Jakarta Selatan",

    deviceSerial: "SN123456789",
    macAddress: "AA-BB-CC-DD-11-22",
    installationDate: "2025-12-06",
    technicianName: "Adi Saputra",
    notes: "Installation completed successfully",

    photos: [
      { id: "p1", url: "/uploads/install1.jpg", caption: "Antenna mounted" },
      { id: "p2", url: "/uploads/install2.jpg", caption: "Router installed" },
    ],

    speedtest: {
      download: 152,
      upload: 24,
      latency: 38,
      jitter: 5,
      imageUrl: "/uploads/speedtest.png",
    },

    status: "Submitted",
    createdAt: "2025-12-06"
  }
];

export default dummyDeployments;
