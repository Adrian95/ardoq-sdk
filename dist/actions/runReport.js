/**
 * Run a report.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {Object} options - Options for running a report.
 * @param {string} options.reportId - ID of the report.
 * @param {Object} [options.params] - Optional parameters (e.g. keyFormat).
 */
export async function runReport(client, {
  reportId,
  params = {
    keyFormat: "key"
  }
}) {
  try {
    const results = await client.reports.runObjects(reportId, params);
    console.log("Report Results:", results);
  } catch (error) {
    console.error("Error:", error.message);
  }
}