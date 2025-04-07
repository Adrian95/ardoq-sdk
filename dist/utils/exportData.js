import fs from "fs";
import { parse } from "json2csv";

/**
 * Exports data to a file in the specified format.
 * @param {string} format - The format to export ("json" or "csv").
 * @param {string} filePath - The file path to save the exported data.
 * @param {Array|Object} data - The data to export.
 */
export async function exportData(format, filePath, data) {
  try {
    if (!data || data.length === 0) {
      throw new Error("No data provided for export.");
    }
    if (format === "json") {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } else if (format === "csv") {
      const csv = parse(data);
      fs.writeFileSync(filePath, csv, "utf-8");
    } else {
      throw new Error("Unsupported format. Use 'json' or 'csv'.");
    }
    console.log(`Data exported successfully to ${filePath}`);
  } catch (error) {
    console.error(`Failed to export data: ${error.message}`);
  }
}