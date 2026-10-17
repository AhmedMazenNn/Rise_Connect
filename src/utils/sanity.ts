type Env = Record<string, string | boolean | undefined>;

const env: Env = (import.meta as unknown as {env?: Env;}).env ?? {};

// Set VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET in your .env file,
// or paste your project ID here directly.
const FALLBACK_PROJECT_ID = '';

export const sanityConfig = {
  projectId: String(env.VITE_SANITY_PROJECT_ID ?? FALLBACK_PROJECT_ID),
  dataset: String(env.VITE_SANITY_DATASET ?? 'production'),
  apiVersion: '2024-10-01'
};

export const isSanityConfigured = sanityConfig.projectId.length > 0;

// Placeholders are visible while Sanity isn't connected or during local development.
// In a production build connected to Sanity, unconfigured items are hidden.
export const showPlaceholders = !isSanityConfigured || env.DEV === true;

export async function sanityFetch<T>(query: string, signal?: AbortSignal): Promise<T> {
  const { projectId, dataset, apiVersion } = sanityConfig;
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Sanity request failed with status ${response.status}`);
  }
  const json = (await response.json()) as {result: T;};
  return json.result;
}

// Requests a resized, auto-formatted image from the Sanity CDN.
export function sanityImage(url: string | undefined, width: number): string | undefined {
  if (!url) return undefined;
  if (!url.includes('cdn.sanity.io/images')) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${width}&auto=format&fit=max&q=80`;
}