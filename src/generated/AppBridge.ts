import {
  isJSON,
  decodeString,
  _decodeString,
  decodeArray,
  _decodeArray,
  decodeNumber,
  _decodeNumber,
} from 'type-decoder';

/**
 * @type { PickedResourceVariant }
 * @description A product variant included in a picked resource.
 */
export type PickedResourceVariant = {
  /**
   * @type { string }
   * @memberof PickedResourceVariant
   */
  id: string;
  /**
   * @type { string }
   * @memberof PickedResourceVariant
   */
  title: string | null;
};

export function decodePickedResourceVariant(rawInput: unknown): PickedResourceVariant | null {
  if (isJSON(rawInput)) {
    const decodedId = decodeString(rawInput['id']);
    const decodedTitle = decodeString(rawInput['title']);

    if (decodedId === null) {
      return null;
    }

    return {
      id: decodedId,
      title: decodedTitle,
    };
  }
  return null;
}

/**
 * @type { PickedResource }
 * @description A resource returned by the Shopify App Bridge resource picker.
 */
export type PickedResource = {
  /**
   * @type { string }
   * @memberof PickedResource
   */
  id: string;
  /**
   * @type { string }
   * @memberof PickedResource
   */
  title: string;
  /**
   * @description Variants of the picked product. Present when the picked resource is a product; contains only the variants the merchant selected. Compare its length with totalVariants to tell a narrowed selection from a whole-product selection.
   * @type { PickedResourceVariant[] }
   * @memberof PickedResource
   */
  variants: PickedResourceVariant[] | null;
  /**
   * @description How many variants the picked product has in total.
   * @type { number }
   * @memberof PickedResource
   */
  totalVariants: number | null;
};

export function decodePickedResource(rawInput: unknown): PickedResource | null {
  if (isJSON(rawInput)) {
    const decodedId = decodeString(rawInput['id']);
    const decodedTitle = decodeString(rawInput['title']);
    const decodedVariants = decodeArray(rawInput['variants'], decodePickedResourceVariant);
    const decodedTotalVariants = decodeNumber(rawInput['totalVariants']);

    if (decodedId === null || decodedTitle === null) {
      return null;
    }

    return {
      id: decodedId,
      title: decodedTitle,
      variants: decodedVariants,
      totalVariants: decodedTotalVariants,
    };
  }
  return null;
}

/**
 * @type { ResourcePickerResult }
 * @description The result returned by the Shopify App Bridge resource picker.
 */
export type ResourcePickerResult = {
  /**
   * @description The selected resources.
   * @type { PickedResource[] }
   * @memberof ResourcePickerResult
   */
  selection: PickedResource[] | null;
};

export function decodeResourcePickerResult(rawInput: unknown): ResourcePickerResult | null {
  if (isJSON(rawInput)) {
    const decodedSelection = decodeArray(rawInput['selection'], decodePickedResource);

    return {
      selection: decodedSelection,
    };
  }
  return null;
}
