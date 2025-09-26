import { HttpError, NetworkError } from "./errors/errors";
import { toQueryString } from "./helpers/helpers";

export type Query = Record<
  string,
  string | number | boolean | undefined | null
>;
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiClientOptions {
  baseUrl: string;
  getToken?: () => string | null | undefined; // para JWT/cookies
  onUnauthorized?: () => void; // logout/refresh
  defaultHeaders?: Record<string, string>;
  retries?: number; // backoff simple
}

export class ApiClient {
  private baseUrl: string;
  private getToken?: ApiClientOptions["getToken"];
  private onUnauthorized?: ApiClientOptions["onUnauthorized"];
  private defaultHeaders: Record<string, string>;
  private retries: number;

  constructor(opts: ApiClientOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/+$/, "");
    this.getToken = opts.getToken;
    this.onUnauthorized = opts.onUnauthorized;
    this.defaultHeaders = {
      Accept: "application/json",
      ...(opts.defaultHeaders ?? {}),
    };
    this.retries = Math.max(0, opts.retries ?? 0);
  }

  private buildUrl(path: string, query?: Query) {
    const qs = query ? toQueryString(query) : "";
    const sep = path.includes("?") ? "&" : "?";
    const url = path.startsWith("http") ? path : `${this.baseUrl}${path}`;
    return qs ? `${url}${sep}${qs}` : url;
  }

  private buildHeaders(extra?: Record<string, string>) {
    const h: Record<string, string> = {
      ...this.defaultHeaders,
      ...(extra ?? {}),
    };
    const token = this.getToken?.();
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
  }

  private async run<T>(
    input: RequestInfo,
    init: RequestInit,
    attempt = 0
  ): Promise<T> {
    try {
      const res = await fetch(input, init);

      if (res.status === 401 && this.onUnauthorized) {
        this.onUnauthorized();
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new HttpError(res.status, text || res.statusText);
      }

      // Manejo flexible: JSON o vacío
      const text = await res.text();
      if (!text) return undefined as unknown as T;
      try {
        return JSON.parse(text) as T;
      } catch {
        return text as unknown as T;
      }
    } 
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e: any) {
      // Retries con backoff básico para errores de red/5xx
      const retriable =
        e instanceof NetworkError ||
        (e instanceof HttpError && e.status >= 500);
      if (retriable && attempt < this.retries) {
        const delay = 300 * Math.pow(2, attempt); // 300ms, 600ms, 1200ms...
        await new Promise((r) => setTimeout(r, delay));
        return this.run<T>(input, init, attempt + 1);
      }
      if (e.name === "TypeError" && e.message?.includes("fetch")) {
        throw new NetworkError(e.message);
      }
      throw e;
    }
  }

  get<T>(path: string, query?: Query, headers?: Record<string, string>) {
    const url = this.buildUrl(path, query);
    return this.run<T>(url, {
      method: "GET",
      headers: this.buildHeaders(headers)
    });
  }

  post<T>(
    path: string,
    body?: unknown,
    query?: Query,
    headers?: Record<string, string>
  ) {
    const url = this.buildUrl(path, query);
    const h = this.buildHeaders({
      "Content-Type": "application/json",
      ...headers,
    });
    return this.run<T>(url, {
      method: "POST",
      headers: h,
      body: body ? JSON.stringify(body) : undefined
    });
  }

  put<T>(
    path: string,
    body?: unknown,
    query?: Query,
    headers?: Record<string, string>
  ) {
    const url = this.buildUrl(path, query);
    const h = this.buildHeaders({
      "Content-Type": "application/json",
      ...headers,
    });
    return this.run<T>(url, {
      method: "PUT",
      headers: h,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(
    path: string,
    body?: unknown,
    query?: Query,
    headers?: Record<string, string>
  ) {
    const url = this.buildUrl(path, query);
    const h = this.buildHeaders({
      "Content-Type": "application/json",
      ...headers,
    });
    return this.run<T>(url, {
      method: "PATCH",
      headers: h,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
  }

  delete<T>(path: string, query?: Query, headers?: Record<string, string>) {
    const url = this.buildUrl(path, query);
    return this.run<T>(url, {
      method: "DELETE",
      headers: this.buildHeaders(headers),
      credentials: "include",
    });
  }
}
