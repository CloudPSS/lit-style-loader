import { unsafeCSS, supportsAdoptingStyleSheets } from "lit";

/** @typedef {import("lit").CSSResult} CSSResult */

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
  if (!supportsAdoptingStyleSheets) return false;
  if (list.some(([id], index) => css[index].id !== id)) return false;
  const newList = load(list);
  for (const [index, result] of css.entries()) {
    const newItem = newList[index];
    try {
      result.styleSheet.replaceSync(newItem.cssText);
    } catch {
      return false;
    }
    result.cssText = newItem.cssText;
  }
  return true;
}
