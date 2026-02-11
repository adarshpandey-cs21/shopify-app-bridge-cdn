import type { ShopifyConfig } from '../types';
import { getApp } from './getApp';

export async function getConfig(): Promise<ShopifyConfig | null> {
  const shopify = await getApp();
  if (!shopify) {
    return null;
  }

  return shopify.config;
}

export async function getShop(): Promise<string | null> {
  const config = await getConfig();
  return config?.shop ?? null;
}

export async function getLocale(): Promise<string | null> {
  const config = await getConfig();
  return config?.locale ?? null;
}
