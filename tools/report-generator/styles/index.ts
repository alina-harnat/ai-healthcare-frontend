import {
  ReportColor,
  ReportColumnWidth,
  ReportCreator,
  ReportFillPattern,
  ReportFillType,
  ReportFont,
  ReportFontSize,
  ReportHorizontalAlignment,
  ReportVerticalAlignment,
} from '../enums';

export const REPORT_DEFAULTS = {
  creator: ReportCreator.Default,
  columnWidth: ReportColumnWidth.Default,

  styles: {
    font: {
      name: ReportFont.Arial,
      size: ReportFontSize.Default,
    },

    header: {
      font: {
        bold: true,
        color: { argb: ReportColor.White },
      },

      fill: {
        type: ReportFillType.Pattern,
        pattern: ReportFillPattern.Solid,
        fgColor: { argb: ReportColor.Primary },
      },

      alignment: {
        vertical: ReportVerticalAlignment.Middle,
        horizontal: ReportHorizontalAlignment.Left,
        wrapText: true,
      },
    },

    rows: {
      alignment: {
        vertical: ReportVerticalAlignment.Top,
        wrapText: true,
      },
    },
  },
} as const;
