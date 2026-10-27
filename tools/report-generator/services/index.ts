import ExcelJS from 'exceljs';

import { REPORT_DEFAULTS } from '../styles';
import type { ReportOptions, ReportSheet } from '../types';

export class ReportGeneratorService {
  async generate(
    sheets: ReportSheet | ReportSheet[],
    outputPath: string,
    options: ReportOptions = {},
  ): Promise<void> {
    const reportSheets = Array.isArray(sheets) ? sheets : [sheets];
    reportSheets.forEach((sheet) => this.validateSheet(sheet));

    const workbook = new ExcelJS.Workbook();

    workbook.creator = options.creator ?? REPORT_DEFAULTS.creator;
    workbook.created = new Date();

    for (const sheet of reportSheets) {
      const worksheet = workbook.addWorksheet(sheet.name);

      worksheet.columns = sheet.columns.map((column) => ({
        header: column.header,
        key: column.key,
        width: column.width ?? REPORT_DEFAULTS.columnWidth,
        style: column.style,
      }));

      worksheet.addRows(sheet.rows);

      this.applyStyles(worksheet, sheet, options);

      if (sheet.autoFilter) {
        worksheet.autoFilter = {
          from: { row: 1, column: 1 },
          to: { row: 1, column: sheet.columns.length },
        };
      }

      if (sheet.freezeHeader) {
        worksheet.views = [{ state: 'frozen', ySplit: 1 }];
      }
    }

    await workbook.xlsx.writeFile(outputPath);
  }

  private applyStyles(
    worksheet: ExcelJS.Worksheet,
    sheet: ReportSheet,
    options: ReportOptions,
  ): void {
    const defaults = options.defaults ?? REPORT_DEFAULTS.styles;

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.font = {
          ...defaults.font,
          ...cell.font,
        };

        if (rowNumber === 1) {
          cell.style = {
            ...defaults.header,
            ...sheet.styles?.header,
            ...cell.style,
          };
        } else {
          cell.style = {
            ...defaults.rows,
            ...sheet.styles?.rows,
            ...cell.style,
          };
        }
      });
    });
  }

  private validateSheet(sheet: ReportSheet): void {
    if (!sheet.name.trim()) {
      throw new Error('Report sheet name cannot be empty');
    }

    if (sheet.columns.length === 0) {
      throw new Error('Report must contain at least one column');
    }

    const keys = sheet.columns.map((column) => column.key);

    if (keys.some((key) => !key.trim())) {
      throw new Error('Column keys cannot be empty');
    }

    if (new Set(keys).size !== keys.length) {
      throw new Error('Column keys must be unique');
    }

    if (sheet.name.trim().length > 31) {
      throw new Error('Report sheet name cannot exceed 31 characters');
    }
  }
}
