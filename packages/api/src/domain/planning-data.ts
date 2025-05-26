export interface PlanningData {
  opportunities: OpportunityPlanningData[];
  steps: PlanningStep[];
}

export interface OpportunityPlanningData {
  name: string;
  benefits: string[];
  enrollmentDeadline: string;
  link: string;
}

export interface PlanningStep {
  id: string;
  title: string;
  emoji: string;
  description?: string;
  tasks: PlanningTask[];
  metadata?: {
    date?: string;
    time?: string;
    location?: string;
    responsible?: string;
  };
}

export interface PlanningTask {
  id: string;
  description: string;
  estimatedTime?: string;
  responsible?: string;
  week?: number;
  completed?: boolean;
}