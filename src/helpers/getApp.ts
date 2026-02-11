import type { ShopifyGlobal } from '../types';
import { hasInitAttempted, getInitPromise } from './appBridge';

export async function getApp(): Promise<ShopifyGlobal | null> {
  if (typeof window === 'undefined') {
    return null;
  }
  if (hasInitAttempted()) {
    const initPromise = getInitPromise();
    if (initPromise) {
      try {
        await initPromise;
      } catch (err) {
        console.error('App Bridge initialization failed:', err);
      }
    }
  }
  return window.shopify || null;
}
