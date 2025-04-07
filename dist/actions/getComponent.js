/**
 * Get details of a specific component.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {string} componentId - The ID of the component to retrieve.
 */
export async function getComponent(client, componentId) {
  try {
    const component = await client.components.get(componentId);
    console.log("Component Details:", component);
  } catch (error) {
    console.error("Error fetching component:", error.message);
  }
}