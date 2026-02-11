import { getApp } from './getApp';

export async function showModal(id: string): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  await shopify.modal.show(id);
}

export async function hideModal(id: string): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  await shopify.modal.hide(id);
}

export async function toggleModal(id: string): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  await shopify.modal.toggle(id);
}
