import { getApp } from './getApp';

export async function getSessionToken(): Promise<string | null> {
  const shopify = await getApp();
  if (!shopify?.idToken) {
    console.error('Shopify App Bridge not initialized or idToken not available');
    return null;
  }

  try {
    const token = await shopify.idToken();
    return token;
  } catch (err) {
    console.error('Failed to get session token:', err);
    return null;
  }
}
