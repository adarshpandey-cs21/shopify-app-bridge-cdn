import type { ResourcePickerOptions } from '../types';
import { getApp } from './getApp';

export async function openResourcePicker(options: ResourcePickerOptions): Promise<unknown> {
  const shopify = await getApp();
  if (!shopify) {
    return null;
  }

  return await shopify.resourcePicker(options);
}

export async function selectProducts(multiple: boolean | number = false): Promise<unknown> {
  return await openResourcePicker({ type: 'product', multiple, action: 'select' });
}

export async function selectCollections(multiple: boolean | number = false): Promise<unknown> {
  return await openResourcePicker({ type: 'collection', multiple, action: 'select' });
}

export async function selectVariants(multiple: boolean | number = false): Promise<unknown> {
  return await openResourcePicker({ type: 'variant', multiple, action: 'select' });
}
