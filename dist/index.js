import dotenv from "dotenv";
import fs from "fs";
import { ArdoqClient } from "./ardoq.js";
import { getUserInfo } from "./actions/getUserInfo.js";
import { listReferences } from "./actions/listReferences.js";
import { createComponent } from "./actions/createComponent.js";
import { updateReference } from "./actions/updateReference.js";
import { runReport } from "./actions/runReport.js";
import { listReports } from "./actions/listReports.js";
import { listWorkspaces } from "./actions/listWorkspaces.js";
import { getWorkspace } from "./actions/getWorkspace.js";
import { getWorkspaceContext } from "./actions/getWorkspaceContext.js";
import { listComponents } from "./actions/listComponents.js";
import { getComponent } from "./actions/getComponent.js";
import { deleteComponent } from "./actions/deleteComponent.js";
import { getReference } from "./actions/getReference.js";
import { deleteReference } from "./actions/deleteReference.js";
import { batchOperations } from "./actions/batchOperations.js";
import { exportData } from "./utils/exportData.js";
dotenv.config();

// Initialize the client with your token and specific subdomain (example: "examplecompany.com")
const client = new ArdoqClient(process.env.ARDOQ_API_TOKEN);

// Example of setting the subdomain dynamically
client.setSubdomain("yoursubdomain");
export { ArdoqClient, getUserInfo, listReferences, createComponent, updateReference, runReport, listReports, listWorkspaces, getWorkspace, getWorkspaceContext, listComponents, getComponent, deleteComponent, getReference, deleteReference, batchOperations };