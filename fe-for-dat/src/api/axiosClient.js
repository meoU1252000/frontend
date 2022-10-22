import axios from "axios";
import { Config } from "@/config";
const StatusCode = {
  Unauthorized: 401,
  Forbidden: 403,
  TooManyRequests: 429,
  InternalServerError: 500,
};

const headers = {
  Accept: "application/json",
};

class Http {
  constructor() {
    this.instance = null;
  }

  get http() {
    // return this.instance != null ? this.instance : this.initHttp()
    return this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: Config.API_URL,
      headers,
    });

    this.instance = http;
    return http;
  }

  request(config) {
    return this.http.request(config);
  }

  get(url, config) {
    return this.http.get(url, config);
  }

  post(url, data, config) {
    return this.http.post(url, data, config);
  }

  put(url, data, config) {
    return this.http.put(url, data, config);
  }

  delete(url, config) {
    return this.http.delete(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  async handleError(error) {
    const { status } = error.response;
    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
