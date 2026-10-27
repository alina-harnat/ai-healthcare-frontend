import type ExcelJS from 'exceljs';

export interface ReportColumn {
  header: string;
  key: string;
  width?: number;
  style?: Partial<ExcelJS.Style>;
}

export interface ReportSheetStyles {
  header?: Partial<ExcelJS.Style>;
  rows?: Partial<ExcelJS.Style>;
}

export interface ReportSheet {
  name: string;
  columns: ReportColumn[];
  rows: object[];
  styles?: ReportSheetStyles;
  autoFilter?: boolean;
  freezeHeader?: boolean;
}

export interface ReportOptions {
  creator?: string;
  defaults?: {
    font?: Partial<ExcelJS.Font>;
    header?: Partial<ExcelJS.Style>;
    rows?: Partial<ExcelJS.Style>;
  };
}
