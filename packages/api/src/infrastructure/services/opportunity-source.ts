import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export interface OpportunitySource {
  retrieve(): Promise<Record<string, unknown>[]>;
  append(data: Record<string, unknown>): Promise<void>;
}

export const OpportunitySource = Symbol('OpportunitySource');

@Injectable()
export class OpportunitySourceSheets implements OpportunitySource {
  private readonly googleSheetsClient: GoogleSpreadsheet;

  constructor(readonly configService: ConfigService) {
    const spreadsheetId = configService.getOrThrow<string>('GOOGLE_SPREADSHEET_ID');
    const email = configService.getOrThrow<string>('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    const key = configService.getOrThrow<string>('GOOGLE_SERVICE_ACCOUNT_KEY');

    const auth = new JWT({
      email,
      key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    this.googleSheetsClient = new GoogleSpreadsheet(spreadsheetId, auth);
  }

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
