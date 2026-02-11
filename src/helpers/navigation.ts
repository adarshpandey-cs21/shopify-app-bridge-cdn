import type { NavigationOptions, SetNavigationMenuOptions } from '../types';
import { getApp } from './getApp';

export async function navigate(url: string): Promise<void> {
  const shopify = await getApp();

  if (!shopify) {
    location.href = url;
    return;
  }

  await shopify.navigation.navigate(url);
}

export function navigateToRemote(url: string, newContext = false): void {
  if (newContext) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
}

export async function navigateWithOptions(options: NavigationOptions): Promise<void> {
  if (options.newContext) {
    navigateToRemote(options.url, true);
  } else {
    await navigate(options.url);
  }
}

export function setNavigationMenu(options: SetNavigationMenuOptions): void {
  if (typeof document === 'undefined') {
    return;
  }

  let navMenu = document.querySelector('ui-nav-menu');

  if (!navMenu) {
    navMenu = document.createElement('ui-nav-menu');
    navMenu.setAttribute('hidden', '');
    document.body.appendChild(navMenu);
  }

  navMenu.innerHTML = '';

  options.items.forEach((item, index) => {
    const link = document.createElement('a');
    link.href = item.destination;
    link.textContent = item.label;

    if (index === 0) {
      link.setAttribute('rel', 'home');
    }

    navMenu.appendChild(link);
  });
}
