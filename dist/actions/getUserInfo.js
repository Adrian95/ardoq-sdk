/**
 * Get current user info.
 *
 * @param {ArdoqClient} client - An instance of ArdoqClient.
 */
export async function getUserInfo(client) {
  try {
    const user = await client.me.get();
    console.log("User Info:", user);
  } catch (error) {
    console.error("Error:", error.message, error.status, error.data);
  }
}