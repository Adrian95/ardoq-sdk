# Ardoq SDK

[![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/ardoq-sdk/ci.yml?branch=main)](https://github.com/your-username/ardoq-sdk/actions)
[![npm version](https://img.shields.io/npm/v/ardoq-sdk)](https://www.npmjs.com/package/ardoq-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This Node.js SDK simplifies interactions with the [Ardoq Public API](https://ardoq.com). It provides tools to manage user information, references, components, workspaces, and reports.

## Installation

Install the package using npm:

```bash
npm install ardoq-sdk
```

## Usage

Here is a quick example of how to use the SDK:

```javascript
const Ardoq = require('ardoq-sdk');

const client = new Ardoq({ apiKey: 'your-api-key' });

client.getWorkspace('workspace-id')
  .then(workspace => console.log(workspace))
  .catch(err => console.error(err));
```

## Quick Start

### Initialize the Client

```javascript
import { ArdoqClient } from "ardoq-sdk";

const client = new ArdoqClient(process.env.ARDOQ_API_TOKEN, {
  subdomain: "your-subdomain",
});
```

### Example Operations

#### Get User Info

```javascript
const userInfo = await client.me.get();
console.log(userInfo);
```

#### List References

```javascript
const references = await client.references.list({
  rootWorkspace: "workspace-id",
});
console.log(references);
```

#### Create a Component

```javascript
const component = await client.components.create({
  name: "My Component",
  typeId: "type-id",
});
console.log(component);
```

#### Update a Reference

```javascript
const updatedReference = await client.references.update(
  "reference-id",
  { description: "Updated description" },
  "1"
);
console.log(updatedReference);
```

#### Run a Report

```javascript
const reportResults = await client.reports.runObjects("report-id", {
  keyFormat: "key",
});
console.log(reportResults);
```

#### Perform Batch Operations

```javascript
const batchData = {
  components: {
    create: [
      {
        body: {
          name: "New Component",
          rootWorkspace: "workspace-id",
          typeId: "type-id",
        },
      },
    ],
  },
};
const batchResult = await client.batch(batchData);
console.log(batchResult);
```

## CLI Usage

The SDK includes a CLI for quick interactions. Example commands:

#### List Workspaces

```bash
node src/cli.js list-workspaces
```

#### List Components in a Workspace

```bash
node src/cli.js list-components <workspaceId>
```

#### Get Workspace Details

```bash
node src/cli.js get-workspace <workspaceId>
```

#### Get Component Details

```bash
node src/cli.js get-component <componentId>
```

Refer to `src/cli.js` for additional commands.

## API Reference

### Methods

#### `client.me.get()`
Fetches information about the authenticated user.

#### `client.references.list(options)`
Lists references in a workspace. Options include:
- `rootWorkspace`: The ID of the workspace to list references for.

#### `client.components.create(data)`
Creates a new component. Data should include:
- `name`: The name of the component.
- `typeId`: The type ID of the component.

#### `client.references.update(referenceId, data, version)`
Updates an existing reference. Parameters include:
- `referenceId`: The ID of the reference to update.
- `data`: The updated data for the reference.
- `version`: The version of the reference to update.

#### `client.reports.runObjects(reportId, options)`
Runs a report and returns the results. Options include:
- `keyFormat`: The format of the keys in the result.

#### `client.batch(data)`
Performs batch operations. Data should include:
- `components.create`: An array of components to create.

## Repository Structure

The repository is organized as follows:

```
/ardoq-sdk
├── src/                # Source code for the SDK
│   ├── actions/        # Action modules for API operations
│   ├── utils/          # Utility functions
│   ├── ardoq.js        # Main SDK logic
│   ├── cli.js          # Command-line interface
│   ├── examples.js     # Example usage scripts
│   └── index.js        # Entry point for the SDK
├── .gitignore          # Git ignore rules
├── .npmignore          # NPM ignore rules
├── LICENSE             # License information
├── package.json        # Project metadata and dependencies
├── README.md           # Documentation
└── exportedData.*      # Example exported data files
```

This structure ensures a clean separation of concerns and makes it easy to navigate the codebase.

## Troubleshooting

### Common Issues

#### Authentication Errors
Ensure that your API token is valid and has the necessary permissions. Double-check the `subdomain` value in the client initialization.

#### API Rate Limits
If you encounter rate limit errors, consider implementing retry logic with exponential backoff.

#### Network Errors
Verify your network connection and ensure that the Ardoq API is accessible from your environment.

### Debugging Tips

- Use the `DEBUG` environment variable to enable verbose logging. For example:
  ```bash
  DEBUG=ardoq-sdk:* node your-script.js
  ```
- Check the Ardoq API documentation for detailed information on endpoints and parameters.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
