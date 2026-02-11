import type { ExtensionInfo } from '../types';
import { getApp } from './getApp';

export async function getAppExtensions(): Promise<ExtensionInfo[]> {
  const shopify = await getApp();
  if (!shopify) {
    return [];
  }

  return await shopify.app.extensions();
}
