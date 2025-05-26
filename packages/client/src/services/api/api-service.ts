import { Opportunity, opportunitySchema, Planning, planningSchema } from './models';

export interface ApiService {
  findOpportunities(input: Record<string, unknown>): Promise<Opportunity[]>;
  createPlanning(opportunitiesIds: string[]): Promise<Planning>;
}

export class ApiServiceImpl implements ApiService {
  constructor(private readonly apiUrl: string) {}

  private buildUrl(path: string) {
    return `${this.apiUrl}${path}`;
  }

  async findOpportunities(input: Record<string, unknown>): Promise<Opportunity[]> {
    const response = await fetch(this.buildUrl('/api/v0/actions/find-opportunities'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    return opportunitySchema.array().parse(await response.json());
  }

  async createPlanning(opportunitiesIds: string[]): Promise<Planning> {
    const response = await fetch(this.buildUrl('/api/v0/actions/create-planning'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ opportunitiesIds }),
    });
    return planningSchema.parse(await response.json());
  }
}
