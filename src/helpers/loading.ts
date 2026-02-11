import { getApp } from './getApp';

export async function setLoading(isLoading: boolean): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  shopify.loading(isLoading);
}
