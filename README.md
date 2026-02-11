# shopify-app-bridge-cdn

Typed wrapper around the [Shopify App Bridge CDN](https://cdn.shopify.com/shopifycloud/app-bridge.js).

The official [`@shopify/app-bridge`](https://www.npmjs.com/package/@shopify/app-bridge) npm package is no longer maintained. Shopify now ships App Bridge exclusively as a CDN script that injects a `shopify` global on `window`. This package wraps that CDN script so you can use it as a normal ES module with TypeScript types and tree-shakable imports.

## Install

```bash
pnpm add shopify-app-bridge-cdn
```

## Setup

Call `init` once at app startup. It injects the CDN `<script>` tag and sets the required `<meta>` tag for your API key.

```ts
import bridge from 'shopify-app-bridge-cdn';

await bridge.init({
  apiKey: 'your-shopify-api-key',
  host: new URLSearchParams(location.search).get('host')!,
});
```

Every other function waits for init to complete before accessing `window.shopify`, so call order doesn't matter after `init`.

## API

### Init & App Instance

| Function       | Returns                          | Description                                     |
| -------------- | -------------------------------- | ----------------------------------------------- |
| `init(config)` | `Promise<void>`                  | Loads the CDN script and configures the API key |
| `getApp()`     | `Promise<ShopifyGlobal \| null>` | Returns the raw `window.shopify` object         |

### Toast

| Function                            | Returns                              |
| ----------------------------------- | ------------------------------------ |
| `showToast(message, options?)`      | `Promise<string \| null>` (toast ID) |
| `showErrorToast(message, options?)` | `Promise<string \| null>`            |
| `hideToast(id)`                     | `Promise<void>`                      |

```ts
const id = await bridge.showToast('Saved', {
  duration: 3000,
  action: 'Undo',
  onAction: () => {
    /* undo logic */
  },
  onDismiss: () => {
    /* cleanup */
  },
});

await bridge.hideToast(id!);
```

### Resource Picker

| Function                       | Returns            |
| ------------------------------ | ------------------ |
| `openResourcePicker(options)`  | `Promise<unknown>` |
| `selectProducts(multiple?)`    | `Promise<unknown>` |
| `selectCollections(multiple?)` | `Promise<unknown>` |
| `selectVariants(multiple?)`    | `Promise<unknown>` |

`multiple` accepts `boolean` or a `number` to cap max selections.

```ts
const products = await bridge.selectProducts(5);

const picked = await bridge.openResourcePicker({
  type: 'product',
  multiple: true,
  action: 'select',
  query: 'Sweater',
  selectionIds: [{ id: 'gid://shopify/Product/123' }],
  filter: {
    hidden: false,
    variants: true,
    draft: false,
    archived: false,
    query: 'tag:sale',
  },
});
```

### Navigation

| Function                                    | Returns         |
| ------------------------------------------- | --------------- |
| `navigate(url)`                             | `Promise<void>` |
| `navigateToRemote(url, newContext?)`        | `void`          |
| `navigateWithOptions({ url, newContext? })` | `Promise<void>` |
| `setNavigationMenu({ items, active? })`     | `void`          |

```ts
await bridge.navigate('/settings');

bridge.navigateToRemote('https://example.com', true);

bridge.setNavigationMenu({
  items: [
    { label: 'Home', destination: '/' },
    { label: 'Settings', destination: '/settings' },
  ],
});
```

### Modal

Controls `<ui-modal>` elements by ID.

| Function          | Returns         |
| ----------------- | --------------- |
| `showModal(id)`   | `Promise<void>` |
| `hideModal(id)`   | `Promise<void>` |
| `toggleModal(id)` | `Promise<void>` |

```ts
await bridge.showModal('confirm-dialog');
```

### Save Bar

Controls `<ui-save-bar>` elements by ID.

| Function                     | Returns         |
| ---------------------------- | --------------- |
| `showSaveBar(id)`            | `Promise<void>` |
| `hideSaveBar(id)`            | `Promise<void>` |
| `toggleSaveBar(id)`          | `Promise<void>` |
| `saveBarLeaveConfirmation()` | `Promise<void>` |

```ts
await bridge.showSaveBar('my-save-bar');

// call before custom navigation to prompt unsaved changes
await bridge.saveBarLeaveConfirmation();
```

### Loading

| Function                | Returns         |
| ----------------------- | --------------- |
| `setLoading(isLoading)` | `Promise<void>` |

```ts
await bridge.setLoading(true);
// ... do work
await bridge.setLoading(false);
```

### Session Token

| Function            | Returns                   |
| ------------------- | ------------------------- |
| `getSessionToken()` | `Promise<string \| null>` |

```ts
const token = await bridge.getSessionToken();
```

### Config

| Function      | Returns                          |
| ------------- | -------------------------------- |
| `getConfig()` | `Promise<ShopifyConfig \| null>` |
| `getShop()`   | `Promise<string \| null>`        |
| `getLocale()` | `Promise<string \| null>`        |

```ts
const shop = await bridge.getShop(); // 'my-store.myshopify.com'
const locale = await bridge.getLocale(); // 'en-US'
```

### Environment

| Function           | Returns                               |
| ------------------ | ------------------------------------- |
| `getEnvironment()` | `Promise<ShopifyEnvironment \| null>` |
| `isEmbedded()`     | `Promise<boolean>`                    |
| `isMobile()`       | `Promise<boolean>`                    |
| `isPos()`          | `Promise<boolean>`                    |

```ts
if (await bridge.isMobile()) {
  // mobile-specific logic
}
```

### App Extensions

| Function             | Returns                    |
| -------------------- | -------------------------- |
| `getAppExtensions()` | `Promise<ExtensionInfo[]>` |

Returns the status of your app's checkout, customer account, admin, and theme extensions.

```ts
const extensions = await bridge.getAppExtensions();
// [{ handle: 'my-ext', activations: [{ target: 'purchase.thank-you.block.render' }] }]
```

## Types

All types are exported from the package:

```ts
import type {
  AppBridgeConfig,
  ToastOptions,
  ResourceType,
  ResourcePickerOptions,
  ResourcePickerFilters,
  ResourcePickerSelectionId,
  NavigationOptions,
  NavigationMenuItem,
  SetNavigationMenuOptions,
  ShopifyConfig,
  ShopifyDebugOptions,
  ShopifyEnvironment,
  ExtensionInfo,
  ExtensionActivation,
  ShopifyGlobal,
} from 'shopify-app-bridge-cdn';
```

## License

ISC
