import type { ResourcePickerOptions, ResourcePickerResult } from '../types';
import { decodeResourcePickerResult } from '../generated';
import { getApp } from './getApp';

export async function openResourcePicker(
  options: ResourcePickerOptions,
): Promise<ResourcePickerResult | null> {
  const shopify = await getApp();
  if (!shopify) {
    return null;
  }

  const result = await shopify.resourcePicker(options);
  return decodeResourcePickerResult({ selection: result });
}

export async function selectProducts(
  multiple: boolean | number = false,
): Promise<ResourcePickerResult | null> {
  return await openResourcePicker({ type: 'product', multiple, action: 'select' });
}

export async function selectCollections(
  multiple: boolean | number = false,
): Promise<ResourcePickerResult | null> {
  return await openResourcePicker({ type: 'collection', multiple, action: 'select' });
}

export async function selectVariants(
  multiple: boolean | number = false,
): Promise<ResourcePickerResult | null> {
  return await openResourcePicker({ type: 'variant', multiple, action: 'select' });
}
