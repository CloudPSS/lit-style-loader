"use strict";

const path = require("path");
const loaderUtils = require("loader-utils");

const loaderApi = () => {};

loaderApi.pitch = function loader(request) {
  const lib = loaderUtils.stringifyRequest(
    this,
    path.resolve(__dirname, "stylesToCssArray.js")
  );
  const source = loaderUtils.stringifyRequest(this, `!!${request}`);
  if (this.hot) {
    return `
import { load, update } from ${lib};
import content from ${source};

let result = load(content);
if (module.hot) {
    module.hot.accept(${source}, function () {
        const updated = update(result, content);
        if (!updated) throw new Error("Can't hmr");
    });
}
export default result;`;
  } else {
    return `
import { load } from ${lib};
import content from ${source};
export default load(content);`;
  }
};

module.exports = loaderApi;
