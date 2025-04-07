/**
 * List all components.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {Object} [params] - Optional query parameters.
 */
export async function listComponents(client, params = {}) {
  try {
    const response = await client.components.list(params);
    if (!response || !response.values || response.values.length === 0) {
      return { total: 0, items: [] };
    }

    return {
      total: response._meta?.total || response.values.length,
      items: response.values.map((component) => ({
        id: component._id,
        name: component.name,
        description: component.description || "No description",
      })),
    };
  } catch (error) {
    console.error("Error listing components:", error.message);
    return { total: 0, items: [] };
  }
}
