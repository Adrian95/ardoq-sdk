/**
 * List all reports.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 */
export async function listReports(client) {
  try {
    const reports = await client.reports.list();
    console.log("Reports:", reports);
  } catch (error) {
    console.error("Error listing reports:", error.message);
  }
}