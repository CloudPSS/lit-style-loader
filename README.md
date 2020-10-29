<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Lit Style Loader</h1>
</div>

# lit-style-loader

Exports CSS as `CSSResult[]` for `lit-element`.

## Getting Started

To begin, you'll need to install `lit-style-loader`:

```console
npm install --save-dev lit-style-loader
```

```console
yarn add --dev lit-style-loader
```

It's recommended to combine `lit-style-loader` with the [`css-loader`](https://github.com/webpack-contrib/css-loader)

Then add the loader to your `webpack` config. For example:

**component.css**

```css
:host {
  background: green;
}
```

**component.js**

```js
import styles from "./style.css?lit";

export default class extends LitElement {
  static get styles() {
    return styles;
  }
}
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        oneOf: [
          {
            resourceQuery: /lit/,
            use: ["lit-style-loader", "css-loader"],
          },
          {
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    ],
  },
};
```

## License

[MIT](./LICENSE)
