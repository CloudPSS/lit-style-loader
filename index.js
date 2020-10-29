'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');

const loaderApi = () => {};

loaderApi.pitch = function loader(request) {
    return `
import api from ${loaderUtils.stringifyRequest(this, path.resolve(__dirname, 'stylesToCssArray.js'))}
import content from ${loaderUtils.stringifyRequest(this, `!!${request}`)};
export default api(content);`;
};

module.exports = loaderApi;
