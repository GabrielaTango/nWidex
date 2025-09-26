// lib/services/errors.ts

/** Error HTTP explícito con código y mensaje */
export class HttpError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message || `HTTP Error ${status}`);
    this.name = "HttpError";
    this.status = status;
  }
}

/** Error de red (timeout, fetch fallido, conexión caída) */
export class NetworkError extends Error {
  constructor(message?: string) {
    super(message || "Network error");
    this.name = "NetworkError";
  }
}
