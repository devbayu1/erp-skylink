export type DeploymentStatus =
  | "Pending"
  | "Submitted"
  | "Verified"
  | "Rejected"
  | "Live";

export interface DeploymentPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface SpeedtestData {
  download: number;
  upload: number;
  latency: number;
  jitter: number;
  imageUrl: string;
}

export interface DeploymentReport {
  id: string;
  iwoId: string;
  iwoNumber: string;

  pksId: string;
  pksNumber: string;

  customerName: string;
  serviceLocation: string;

  deviceSerial: string;
  macAddress: string;

  installationDate: string;
  technicianName: string;
  notes: string;

  photos: DeploymentPhoto[];
  speedtest?: SpeedtestData;

  status: DeploymentStatus;
  createdAt: string;
}
