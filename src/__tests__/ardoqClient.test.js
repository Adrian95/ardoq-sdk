import { ArdoqClient } from "../ardoq.js";

describe("ArdoqClient", () => {
  it("should initialize with an API token", () => {
    const client = new ArdoqClient("test-api-token");
    expect(client.apiToken).toBe("test-api-token");
  });

  it("should set the subdomain correctly", () => {
    const client = new ArdoqClient("test-api-token");
    client.setSubdomain("test-subdomain");
    expect(client.subdomain).toBe("test-subdomain");
  });

  // Add more tests as needed for other methods
});
