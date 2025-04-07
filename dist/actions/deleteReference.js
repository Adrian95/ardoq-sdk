/**
 * Delete a specific reference.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {string} referenceId - The ID of the reference to delete.
 */
export async function deleteReference(client, referenceId) {
  try {
    await client.references.delete(referenceId);
    console.log(`Reference with ID ${referenceId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting reference:", error.message);
  }
}