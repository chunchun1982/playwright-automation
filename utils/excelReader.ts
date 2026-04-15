import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

export function getTestData(filePath: string, sheetName: string): Record<string, any>[] {
  try {
    // Better path handling (from project root)
    const resolvedPath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found at: ${resolvedPath}`);
    }

    const workbook = XLSX.readFile(resolvedPath);
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }

    return XLSX.utils.sheet_to_json<Record<string, any>>(sheet);

  } catch (error) {
    throw new Error(`Error reading Excel file: ${(error as Error).message}`);
  }
}