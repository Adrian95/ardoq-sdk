/**
 * Get the context of a specific workspace.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {string} workspaceId - The ID of the workspace to retrieve context for.
 */
export async function getWorkspaceContext(client, workspaceId) {
  try {
    const context = await client.workspaces.context(workspaceId);
    console.log("Workspace Context:", context);
  } catch (error) {
    console.error("Error fetching workspace context:", error.message);
  }
}