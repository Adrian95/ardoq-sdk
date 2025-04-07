// test-sdk.js
import { listWorkspaces } from "./index.js";
import { ArdoqClient } from "./ardoq.js";
import dotenv from "dotenv";

dotenv.config();

const client = new ArdoqClient(process.env.ARDOQ_API_TOKEN);
client.setSubdomain("titantech.us");

async function test() {
  try {
    const workspaces = await listWorkspaces(client);
    console.log("Workspaces:", workspaces);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
