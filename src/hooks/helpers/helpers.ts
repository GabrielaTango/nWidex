import type { Query } from "../apiClient";

/**
 * Convierte un objeto { clave: valor } en querystring:
 * { page:1, search:"juan" } → "page=1&search=juan"
 */
export function toQueryString(query: Query): string {
  const usp = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      usp.set(k, String(v));
    }
  });
  return usp.toString();
}
