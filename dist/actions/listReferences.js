/**
 * List references with filters.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {Object} options - Options for listing references.
 * @param {string} options.rootWorkspace - The rootWorkspace ID.
 */
export async function listReferences(client, {
  rootWorkspace
}) {
  try {
    const references = await client.references.list({
      rootWorkspace
    });
    console.log("References:", references);
  } catch (error) {
    console.error("Error:", error.message);
  }
}