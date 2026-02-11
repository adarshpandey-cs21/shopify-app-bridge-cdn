import type { ToastOptions } from '../types';
import { getApp } from './getApp';

export async function showToast(
  message: string,
  options: ToastOptions = {},
): Promise<string | null> {
  const shopify = await getApp();
  if (!shopify) {
    return null;
  }

  return shopify.toast.show(message, {
    duration: options.duration ?? 5000,
    isError: options.isError ?? false,
    action: options.action,
    onAction: options.onAction,
    onDismiss: options.onDismiss,
  });
}

export async function showErrorToast(
  message: string,
  options: Omit<ToastOptions, 'isError'> = {},
): Promise<string | null> {
  return await showToast(message, { ...options, isError: true });
}

export async function hideToast(id: string): Promise<void> {
  const shopify = await getApp();
  if (!shopify) {
    return;
  }

  shopify.toast.hide(id);
}
