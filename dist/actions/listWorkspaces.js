/**
 * List all workspaces.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {Object} [params] - Optional query parameters.
 */
export async function listWorkspaces(client, params = {}) {
  try {
    const response = await client.workspaces.list(params);
    console.log("Raw API Response:", JSON.stringify(response, null, 2)); // Debug log

    if (!response || !response.values || response.values.length === 0) {
      return {
        total: 0,
        values: []
      };
    }
    return {
      total: response._meta?.total || response.values.length,
      values: response.values.map(workspace => ({
        id: workspace._id,
        name: workspace.name,
        description: workspace.description || "No description"
      }))
    };
  } catch (error) {
    console.error("Error listing workspaces:", error.message);
    return {
      total: 0,
      values: []
    };
  }
}