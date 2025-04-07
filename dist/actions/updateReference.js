/**
 * Update a reference.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 * @param {Object} options - Options for updating a reference.
 * @param {string} options.referenceId - ID of the reference.
 * @param {Object} options.updateData - Data to update.
 * @param {string} options.ifVersionMatch - The version match parameter.
 */
export async function updateReference(client, {
  referenceId,
  updateData,
  ifVersionMatch
}) {
  try {
    const updated = await client.references.update(referenceId, updateData, ifVersionMatch);
    console.log("Updated Reference:", updated);
  } catch (error) {
    console.error("Error:", error.message);
  }
}