export type * from './generated';

export type AppBridgeConfig = {
  apiKey: string;
  host: string;
};

export type ToastOptions = {
  duration?: number;
  isError?: boolean;
  action?: string;
  onAction?: () => void;
  onDismiss?: () => void;
};

export type ResourceType = 'product' | 'collection' | 'variant';

export type ResourcePickerFilters = {
  hidden?: boolean;
  variants?: boolean;
  draft?: boolean;
  archived?: boolean;
  query?: string;
};

export type ResourcePickerSelectionId = {
  id: string;
  variants?: { id: string }[];
};

export type ResourcePickerOptions = {
  type: ResourceType;
  multiple?: boolean | number;
  action?: 'select' | 'add';
  filter?: ResourcePickerFilters;
  query?: string;
  selectionIds?: ResourcePickerSelectionId[];
};

export type NavigationOptions = {
  url: string;
  newContext?: boolean;
};

export type NavigationMenuItem = {
  label: string;
  destination: string;
};

export type SetNavigationMenuOptions = {
  items: NavigationMenuItem[];
  active?: NavigationMenuItem;
};

export type ShopifyDebugOptions = {
  webVitals?: boolean;
};

export type ShopifyConfig = {
  apiKey: string;
  host: string;
  shop: string;
  locale: string;
  appOrigins?: string[];
  debug?: ShopifyDebugOptions;
  disabledFeatures?: string[];
  experimentalFeatures?: string[];
};

export type ShopifyEnvironment = {
  embedded: boolean;
  mobile: boolean;
  pos: boolean;
};

export type ExtensionActivation = {
  target: string;
  handle: string;
  name: string;
  status: string;
  activations: ExtensionThemeActivation[];
};

export type ExtensionThemeActivation = {
  themeId: number;
  target: string;
};

export type ExtensionInfo = {
  handle: string;
  activations: ExtensionActivation[];
};

export type ShopifyGlobal = {
  config: ShopifyConfig;
  environment: ShopifyEnvironment;
  loading: (isLoading: boolean) => void;
  idToken: () => Promise<string>;

  toast: {
    show: (message: string, options?: ToastOptions) => string;
    hide: (id: string) => void;
  };

  resourcePicker: (options: ResourcePickerOptions) => Promise<unknown>;

  navigation: {
    navigate: (path: string) => Promise<void>;
  };

  modal: {
    show: (id: string) => Promise<void>;
    hide: (id: string) => Promise<void>;
    toggle: (id: string) => Promise<void>;
  };

  saveBar: {
    show: (id: string) => Promise<void>;
    hide: (id: string) => Promise<void>;
    toggle: (id: string) => Promise<void>;
    leaveConfirmation: () => Promise<void>;
  };

  app: {
    extensions: () => Promise<ExtensionInfo[]>;
  };
};

declare global {
  interface Window {
    shopify?: ShopifyGlobal;
  }
}
