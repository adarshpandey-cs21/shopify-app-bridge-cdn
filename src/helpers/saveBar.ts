import { getApp } from './getApp';

export async function showSaveBar(id: string): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  await shopify.saveBar.show(id);
}

export async function hideSaveBar(id: string): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  await shopify.saveBar.hide(id);
}

export async function toggleSaveBar(id: string): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  await shopify.saveBar.toggle(id);
}

export async function saveBarLeaveConfirmation(): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  await shopify.saveBar.leaveConfirmation();
}
