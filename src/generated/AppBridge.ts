import { isJSON, decodeString, _decodeString, decodeArray, _decodeArray } from 'type-decoder';

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
};

export function decodePickedResource(rawInput: unknown): PickedResource | null {
  if (isJSON(rawInput)) {
    const decodedId = decodeString(rawInput['id']);
    const decodedTitle = decodeString(rawInput['title']);

    if (decodedId === null || decodedTitle === null) {
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
