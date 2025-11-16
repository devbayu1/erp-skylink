export type PipelineStage = "prospect" | "quotation" | "negotiation" | "won" | "lost";

export interface PipelineOpportunity {
  id: string;
  customerName: string;
  serviceType: string;
  value: number;
  daysInStage: number;
  stage: PipelineStage;
  salesPerson: string;
  createdDate: string;
  lostReason?: string;
}

export interface PipelineStageData {
  stage: PipelineStage;
  label: string;
  count: number;
  totalValue: number;
  opportunities: PipelineOpportunity[];
  color: string;
  bgColor: string;
}

export interface PipelineMetrics {
  totalValue: number;
  totalValueTrend: number;
  activeOpportunities: number;
  winRate: number;
  winRateTrend: number;
  averageDealSize: number;
}

export interface PipelineFilters {
  searchQuery: string;
  dateRange: {
    from: string;
    to: string;
  };
  salesPerson: string;
  serviceType: string;
  valueRange: {
    min: number;
    max: number;
  };
}
