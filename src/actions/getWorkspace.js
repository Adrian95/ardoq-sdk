/**
 * Get details of a specific workspace.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {string} workspaceId - The ID of the workspace to retrieve.
 */
export async function getWorkspace(client, workspaceId) {
  try {
    const workspace = await client.workspaces.get(workspaceId);
    console.log("Workspace Details:", workspace);
  } catch (error) {
    console.error("Error fetching workspace:", error.message);
  }
}
