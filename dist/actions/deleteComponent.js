/**
 * Delete a specific component.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {string} componentId - The ID of the component to delete.
 */
export async function deleteComponent(client, componentId) {
  try {
    await client.components.delete(componentId);
    console.log(`Component with ID ${componentId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting component:", error.message);
  }
}