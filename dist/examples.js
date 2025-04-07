import dotenv from "dotenv";
import promptSync from "prompt-sync";
dotenv.config();
if (!process.env.ARDOQ_API_TOKEN) {
  console.error("Error: ARDOQ_API_TOKEN is not set in the environment variables.");
  process.exit(1);
}
import { ArdoqClient } from "./index.js";
(async () => {
  const client = new ArdoqClient(process.env.ARDOQ_API_TOKEN, {
    subdomain: "titantech.us"
  });
  const menu = "\nChoose an example to run:\n1. Get User Info\n2. List Workspaces\n3. Create a Component\n4. Exit\n";
  const prompt = promptSync();
  while (true) {
    console.log(menu);
    const choice = prompt("Enter your choice: ");
    try {
      switch (choice) {
        case "1":
          const userInfo = await client.me.get();
          console.log("User Info:", userInfo);
          break;
        case "2":
          const workspaceList = await client.workspaces.list();
          console.log("Workspaces:", workspaceList);
          break;
        case "3":
          // First get a workspace ID and its context
          const availableWorkspaces = await client.workspaces.list();
          if (availableWorkspaces.values && availableWorkspaces.values.length > 0) {
            const workspace = availableWorkspaces.values[0];
            const context = await client.workspaces.context(workspace._id);

            // Get existing components to use as parent
            const components = await client.components.list({
              rootWorkspace: workspace._id
            });
            if (!components.values || components.values.length === 0) {
              console.error("No components found to use as parent. Creating a root component first.");
              const rootComponent = await client.components.create({
                name: "Root Component",
                typeId: "custom",
                rootWorkspace: workspace._id
              });
              console.log("Created root component:", rootComponent);
            }
            const parentId = components.values ? components.values[0]._id : rootComponent._id;

            // Now create the component with a parent
            const newComponent = await client.components.create({
              name: "Example Component",
              typeId: "p1",
              rootWorkspace: workspace._id,
              parent: parentId
            });
            console.log("Created Component:", newComponent);
          } else {
            console.error("No workspaces found to create component in");
          }
          break;
        case "4":
          console.log("Exiting...");
          return;
        default:
          console.log("Invalid choice. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
})();