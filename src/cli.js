#!/usr/bin/env node

import { Command } from "commander";
import dotenv from "dotenv";
import { ArdoqClient } from "./ardoq.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { listWorkspaces } from "./actions/listWorkspaces.js";
import { listComponents } from "./actions/listComponents.js";
import { getWorkspace } from "./actions/getWorkspace.js";
import { getComponent } from "./actions/getComponent.js";

dotenv.config();

const program = new Command();
const client = new ArdoqClient(process.env.ARDOQ_API_TOKEN, {
  subdomain: "titantech.us",
});

program
  .name("ardoq-cli")
  .description("CLI for interacting with the Ardoq SDK")
  .version("1.0.0");

// Updated to format the output and handle empty or unexpected responses
program
  .command("list-workspaces")
  .description("List all workspaces")
  .option("--page <number>", "Page number", 1)
  .option("--pageSize <number>", "Number of items per page", 5)
  .option("--next", "Fetch the next set of results", false)
  .action(async (options) => {
    try {
      const page = options.next ? parseInt(options.page) + 1 : options.page;
      const result = await listWorkspaces(client, {
        page,
        pageSize: options.pageSize,
      });

      if (!result || !result.values || result.values.length === 0) {
        console.log("No workspaces found.");
        return;
      }

      console.log("Workspaces:");
      result.values.forEach((workspace) => {
        console.log(`- Name: ${workspace.name}`);
        console.log(`  ID: ${workspace._id}`);
        console.log(
          `  Description: ${workspace.description || "No description"}`
        );
        console.log("-----------------------------");
      });

      if (result.total > page * options.pageSize) {
        console.log(
          `There are more results. Use --page ${
            page + 1
          } or --next to fetch the next set.`
        );
      }
    } catch (error) {
      console.error("Error listing workspaces:", error.message);
    }
  });

// Updated to ensure consistent functionality across all CLI tools
program
  .command("list-components")
  .description("List all components in a workspace")
  .argument("<workspaceId>", "Workspace ID")
  .option("--page <number>", "Page number", 1)
  .option("--pageSize <number>", "Number of items per page", 5)
  .option("--next", "Fetch the next set of results", false)
  .action(async (workspaceId, options) => {
    try {
      const page = options.next ? parseInt(options.page) + 1 : options.page;
      const result = await listComponents(client, {
        rootWorkspace: workspaceId,
        page,
        pageSize: options.pageSize,
      });

      if (!result || !result.items || result.items.length === 0) {
        console.log("No components found.");
        return;
      }

      console.log("Components:");
      result.items.forEach((component) => {
        console.log(`- Name: ${component.name}`);
        console.log(`  ID: ${component._id}`);
        console.log(
          `  Description: ${component.description || "No description"}`
        );
        console.log("-----------------------------");
      });

      if (result.total > page * options.pageSize) {
        console.log(
          `There are more results. Use --page ${
            page + 1
          } or --next to fetch the next set.`
        );
      }
    } catch (error) {
      console.error("Error listing components:", error.message);
    }
  });

program
  .command("get-workspace")
  .description("Get details of a specific workspace")
  .argument("<workspaceId>", "Workspace ID")
  .action(async (workspaceId) => {
    try {
      const workspace = await getWorkspace(client, workspaceId);
      console.log(workspace);
    } catch (error) {
      console.error("Error fetching workspace:", error.message);
    }
  });

program
  .command("get-component")
  .description("Get details of a specific component")
  .argument("<componentId>", "Component ID")
  .action(async (componentId) => {
    try {
      const component = await getComponent(client, componentId);
      console.log(component);
    } catch (error) {
      console.error("Error fetching component:", error.message);
    }
  });

program.parse(process.argv);

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 <command> [options]")
  .command("list-workspaces", "List all workspaces")
  .command("list-components <workspaceId>", "List components in a workspace")
  .command("get-workspace <workspaceId>", "Get details of a workspace")
  .command("get-component <componentId>", "Get details of a component")
  .help("h")
  .alias("h", "help")
  .example(
    "$0 list-workspaces",
    "Lists all workspaces available in your Ardoq account"
  )
  .example(
    "$0 list-components workspace123",
    "Lists all components in the workspace with ID 'workspace123'"
  )
  .example(
    "$0 get-workspace workspace123",
    "Fetches details of the workspace with ID 'workspace123'"
  )
  .example(
    "$0 get-component component123",
    "Fetches details of the component with ID 'component123'"
  )
  .demandCommand(1, "You need to specify a command before moving on").argv;

// Handle commands
switch (argv._[0]) {
  case "list-workspaces":
    listWorkspaces(client);
    break;
  case "list-components":
    listComponents(client, { rootWorkspace: argv.workspaceId });
    break;
  case "get-workspace":
    getWorkspace(client, argv.workspaceId);
    break;
  case "get-component":
    getComponent(client, argv.componentId);
    break;
  default:
    console.error("Unknown command");
    yargs.showHelp();
    break;
}
