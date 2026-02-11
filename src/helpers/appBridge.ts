import type { AppBridgeConfig } from '../types';

let apiKey: string | null = null;
let host: string | null = null;
let error: Error | null = null;
let scriptLoaded = false;
let initPromise: Promise<void> | null = null;
const SCRIPT_ID = 'shopify-app-bridge-script';

function setApiKey(key: string): void {
  let meta = document.querySelector('meta[name="shopify-api-key"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'shopify-api-key');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', key);
}

function loadAppBridgeScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (scriptLoaded) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://cdn.shopify.com/shopifycloud/app-bridge.js';
    script.async = false;
    script.defer = false;

    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Failed to load App Bridge script'));
    };

    const firstScript = document.head.querySelector('script');
    if (firstScript) {
      document.head.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  });
}

export async function init(config: AppBridgeConfig): Promise<void> {
  console.warn('Init Triggered');
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    if (!config.apiKey) {
      throw new Error('Shopify API key is required');
    }

    try {
      setApiKey(config.apiKey);
      await loadAppBridgeScript();

      apiKey = config.apiKey;
      host = config.host;
      error = null;
    } catch (err) {
      error = err instanceof Error ? err : new Error('Failed to initialize App Bridge');
      throw error;
    }
  })();

  return initPromise;
}

export function isInitialized(): boolean {
  return (
    apiKey !== null &&
    scriptLoaded &&
    typeof window !== 'undefined' &&
    typeof window.shopify !== 'undefined'
  );
}

export function hasInitAttempted(): boolean {
  return initPromise !== null;
}

export function getInitPromise(): Promise<void> | null {
  return initPromise;
}

export function getApiKey(): string | null {
  return apiKey;
}

export function getHost(): string | null {
  return host;
}

export function getError(): Error | null {
  return error;
}

export function reset(): void {
  apiKey = null;
  host = null;
  error = null;
  initPromise = null;
}
