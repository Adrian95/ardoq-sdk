import dotenv from "dotenv";
import axios from "axios";
import winston from "winston";
dotenv.config();

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

/**
 * Custom error class for Ardoq API errors.
 */
export class ArdoqError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    logger.error(`ArdoqError: ${message}`, { status, data });
  }
}

/**
 * Main client class for interacting with the Ardoq Public API.
 */
export class ArdoqClient {
  constructor(token = process.env.ARDOQ_API_TOKEN, options = {}) {
    if (!token) throw new Error("Authentication token is required");
    this.token = token;
    this.subdomain = options.subdomain || null;
    const baseURL =
      options.baseURL || `https://${this.subdomain || "app"}.ardoq.com/api/v2`;
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Enable logging if debug mode is on
    this.debug = options.debug || false;
    if (this.debug) {
      this.axiosInstance.interceptors.request.use((config) => {
        console.log("Request:", config);
        return config;
      });
      this.axiosInstance.interceptors.response.use((response) => {
        console.log("Response:", response);
        return response;
      });
    }

    // Set up interceptor to centralize error handling.
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this._handleError(error))
    );

    // Initialize resource classes
    this.me = new Me(this);
    this.references = new References(this);
    this.components = new Components(this);
    this.workspaces = new Workspaces(this);
    this.reports = new Reports(this);
  }

  setSubdomain(subdomain) {
    this.subdomain = subdomain;
    this.axiosInstance.defaults.baseURL = `https://${this.subdomain}.ardoq.com/api/v2`;
  }

  _handleError(error) {
    if (error.response) {
      const endpoint = error.config.url;
      const method = error.config.method.toUpperCase();
      const errorMessage = `Error ${method} ${endpoint}: ${
        error.response.data.message || "API error"
      }`;
      logger.error(errorMessage, {
        status: error.response.status,
        data: error.response.data,
      });
      return new ArdoqError(errorMessage, error.response.status, error.response.data);
    } else if (error.request) {
      const errorMessage = "No response received";
      logger.error(errorMessage);
      return new ArdoqError(errorMessage, null, null);
    } else {
      logger.error(error.message);
      return new ArdoqError(error.message, null, null);
    }
  }

  async batch(data) {
    const response = await this.axiosInstance.post("/batch", data);
    return response.data;
  }

  async getDefaultWorkspaceId() {
    const defaultWs = await this.workspaces.getDefaultWorkspace();
    return defaultWs.id;
  }

  async getWorkspaceByName(name) {
    const workspaces = await this.workspaces.list();
    const match = workspaces.find((ws) => ws.name === name);
    if (match) {
      return match;
    }
    throw new Error(`No workspace found with name: ${name}`);
  }
}

class Me {
  constructor(client) {
    this.client = client;
  }
  async get() {
    const response = await this.client.axiosInstance.get("/me");
    return response.data;
  }
}

class References {
  constructor(client) {
    this.client = client;
  }
  async list(params = {}) {
    const response = await this.client.axiosInstance.get("/references", {
      params,
    });
    return response.data;
  }
  async create(data) {
    const response = await this.client.axiosInstance.post("/references", data);
    return response.data;
  }
  async get(id) {
    const response = await this.client.axiosInstance.get(`/references/${id}`);
    return response.data;
  }
  async update(id, data, ifVersionMatch) {
    const response = await this.client.axiosInstance.patch(
      `/references/${id}`,
      data,
      {
        params: { ifVersionMatch },
      }
    );
    return response.data;
  }
  async delete(id) {
    await this.client.axiosInstance.delete(`/references/${id}`);
  }
}

class Components {
  constructor(client) {
    this.client = client;
  }
  async list(params = {}) {
    const response = await this.client.axiosInstance.get("/components", {
      params,
    });
    return response.data;
  }
  async create(data) {
    const response = await this.client.axiosInstance.post("/components", data);
    return response.data;
  }
  async get(id) {
    const response = await this.client.axiosInstance.get(`/components/${id}`);
    return response.data;
  }
  async update(id, data, ifVersionMatch) {
    const response = await this.client.axiosInstance.patch(
      `/components/${id}`,
      data,
      {
        params: { ifVersionMatch },
      }
    );
    return response.data;
  }
  async delete(id) {
    await this.client.axiosInstance.delete(`/components/${id}`);
  }
}

class Workspaces {
  constructor(client) {
    this.client = client;
  }
  async list(params = {}) {
    const response = await this.client.axiosInstance.get("/workspaces", {
      params,
    });
    return response.data;
  }
  async get(id) {
    const response = await this.client.axiosInstance.get(`/workspaces/${id}`);
    return response.data;
  }
  async context(id) {
    const response = await this.client.axiosInstance.get(
      `/workspaces/${id}/context`
    );
    return response.data;
  }
  async getDefaultWorkspace() {
    const workspaces = await this.list();
    if (Array.isArray(workspaces) && workspaces.length > 0) {
      return workspaces[0];
    }
    throw new Error("No workspaces available");
  }
  async getWorkspaceByName(name) {
    const workspaces = await this.list();
    const match = workspaces.find((ws) => ws.name === name);
    if (match) {
      return match;
    }
    throw new Error(`No workspace found with name: ${name}`);
  }
}

class Reports {
  constructor(client) {
    this.client = client;
  }
  async list(params = {}) {
    const response = await this.client.axiosInstance.get("/reports", {
      params,
    });
    return response.data;
  }
  async get(id) {
    const response = await this.client.axiosInstance.get(`/reports/${id}`);
    return response.data;
  }
  async runObjects(id, params = {}) {
    const response = await this.client.axiosInstance.get(
      `/reports/${id}/run/objects`,
      { params }
    );
    return response.data;
  }
  async runTabular(id) {
    const response = await this.client.axiosInstance.get(
      `/reports/${id}/run/tabular`
    );
    return response.data;
  }
}
