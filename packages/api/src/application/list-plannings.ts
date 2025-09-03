import { Inject, Injectable, Logger } from '@nestjs/common';
import { Planning } from 'src/domain/planning';
import { PlanningRepository } from 'src/infrastructure/services/planning-repository';

export interface Input {}

export interface Output {
  plannings: Planning[];
}

@Injectable()
export class ListPlannings {
  private readonly logger = new Logger(ListPlannings.name);

  constructor(
    @Inject(PlanningRepository) private readonly planningRepository: PlanningRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const plannings = await this.planningRepository.list();
    return { plannings };
  }
}
