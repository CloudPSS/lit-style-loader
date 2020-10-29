'use strict';

const { unsafeCSS } = require('lit-element');

function toCssResult(item) {
    let [id, css, media, sourceMap] = item || [];
    if (media) {
        throw new Error(`Css with media query is not supported, ${id}`);
    }
    if (sourceMap) {
        css = `${css}
/*# sourceMappingURL=data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))} */
`;
    }
    return unsafeCSS(css);
}

module.exports = function (list) {
    list = list || [];
    return list.map((i) => toCssResult(i));
};
