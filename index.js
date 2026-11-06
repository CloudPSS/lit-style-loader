import { resolve } from "node:path";

const loaderApi = () => {};

export function pitch(request) {
  const context = this.context || this.rootContext;
  const lib = JSON.stringify(
    this.utils.contextify(
      context,
      resolve(import.meta.dirname, "stylesToCssArray.js"),
    ),
  );
  const source = JSON.stringify(this.utils.contextify(context, `!!${request}`));
  if (this.hot) {
    return `
import { load, update } from ${lib};
import content from ${source};

const result = load(content);
if (import.meta.webpackHot) {
    import.meta.webpackHot.accept(${source}, function () {
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
}

export default loaderApi;
