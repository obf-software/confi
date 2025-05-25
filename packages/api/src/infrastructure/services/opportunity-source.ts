import { Inject, Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export interface OpportunitySource {
  retrieve(): Promise<Record<string, unknown>[]>;
  append(data: Record<string, unknown>): Promise<void>;
}

export const OpportunitySource = Symbol('OpportunitySource');

@Injectable()
export class OpportunitySourceSheets implements OpportunitySource {
  constructor(@Inject(GoogleSpreadsheet) private readonly googleSheetsClient: GoogleSpreadsheet) {}

  async retrieve(): Promise<Record<string, string>[]> {
    await this.googleSheetsClient.loadInfo();
    const sheet = this.googleSheetsClient.sheetsByTitle.OPPORTUNITIES;

    const rows = await sheet.getRows();
    return rows.map((row) => row.toObject());
  }

  async append(data: Record<string, string>): Promise<void> {
    await this.googleSheetsClient.loadInfo();
    const sheet = this.googleSheetsClient.sheetsByTitle.OPPORTUNITY_SEARCH;
    await sheet.addRow(data);
  }
}
