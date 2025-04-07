/**
 * Get details of a specific reference.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {string} referenceId - The ID of the reference to retrieve.
 */
export async function getReference(client, referenceId) {
  try {
    const reference = await client.references.get(referenceId);
    console.log("Reference Details:", reference);
  } catch (error) {
    console.error("Error fetching reference:", error.message);
  }
}
