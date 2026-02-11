import type { ShopifyEnvironment } from '../types';
import { getApp } from './getApp';

export async function getEnvironment(): Promise<ShopifyEnvironment | null> {
  const shopify = await getApp();
  if (!shopify) {
    return null;
  }

  return shopify.environment;
}

export async function isEmbedded(): Promise<boolean> {
  const env = await getEnvironment();
  return env?.embedded ?? false;
}

export async function isMobile(): Promise<boolean> {
  const env = await getEnvironment();
  return env?.mobile ?? false;
}

export async function isPos(): Promise<boolean> {
  const env = await getEnvironment();
  return env?.pos ?? false;
}
