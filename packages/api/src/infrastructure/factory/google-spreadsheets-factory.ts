/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export const googleSpreadsheetsFactory: FactoryProvider = {
  provide: GoogleSpreadsheet,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const spreadsheetId = configService.getOrThrow('GOOGLE_SPREADSHEET_ID') as string;
    const email = configService.getOrThrow('GOOGLE_SERVICE_ACCOUNT_EMAIL') as string;
    const key = configService.getOrThrow('GOOGLE_SERVICE_ACCOUNT_KEY') as string;

    const auth = new JWT({
      email,
      key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    return new GoogleSpreadsheet(spreadsheetId, auth);
  },
};
