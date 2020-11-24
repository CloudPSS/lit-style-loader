"use strict";

import { unsafeCSS, CSSResult, supportsAdoptingStyleSheets } from "lit-element";

/**
 * @param {[string, string, string, string]} item
 * @returns {CSSResult}
 */
function toCssResult(item) {
  let [id, css, media, sourceMap] = item || [];
  if (media) {
    throw new Error(`Css with media query is not supported, ${id}`);
  }
  if (sourceMap) {
    css = `${css}
/*# sourceMappingURL=data:application/json;base64,${btoa(
      unescape(encodeURIComponent(JSON.stringify(sourceMap)))
    )} */
`;
  }
  const result = unsafeCSS(css);
  result.id = id;
  return result;
}

/**
 * @param {[string, string, string, string][]} list
 * @returns {CSSResult[]}
 */
export function load(list) {
  list = list || [];
  return list.map((i) => toCssResult(i));
}

/**
 * @param {CSSResult[]} css
 * @param {[string, string, string, string|undefined][]} list
 *
 * @returns {boolean}
 */
export function update(css, list) {
  list = list || [];
  if (css.length !== list.length) return false;
  if (css.length !== list.length) return false;
  if (!supportsAdoptingStyleSheets) return false;
  if (list.some(([id]) => !css.find((c) => c.id === id))) return false;
  if (css.some(({ id }) => !list.find(([lid]) => id === lid)))
    return load(list);
  const newList = load(list);
  for (const result of css) {
    const newItem = newList.find((c) => c.id === result.id);
    result.cssText = newItem.cssText;
    if (result._styleSheet && supportsAdoptingStyleSheets) {
      try {
        result._styleSheet.replaceSync(newItem.cssText);
      } catch {
        // ignore css error on replacing
      }
    }
  }
  return true;
}
