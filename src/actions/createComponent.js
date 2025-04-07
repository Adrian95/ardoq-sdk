/**
 * Create a component using the default workspace.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {Object} options - Options for creating a component.
 * @param {string} options.name - Name of the component.
 * @param {string} options.typeId - Type ID for the component.
 */
export async function createComponent(client, { name, typeId }) {
  try {
    const defaultWorkspaceId = await client.getDefaultWorkspaceId();
    const componentData = {
      name,
      rootWorkspace: defaultWorkspaceId,
      typeId,
    };
    const component = await client.components.create(componentData);
    console.log("Created Component:", component);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
