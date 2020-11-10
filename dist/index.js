"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = theoLoader;

var _theo = require("theo");

var _loaderUtils = require("loader-utils");

var _options = require("./options");

function theoLoader(source) {
  const logger = this.getLogger('theo-loader'); // Mark async, need to call `callback` on result or error.

  const callback = this.async(); // `this` is loader interface; https://v4.webpack.js.org/api/loaders/

  const {
    resourcePath,
    addDependency
  } = this;
  const options = (0, _options.prepareOptions)((0, _loaderUtils.getOptions)(this));
  addDependency(resourcePath);

  try {
    watchTheoImports(resourcePath, addDependency, logger);
    (0, _theo.convert)({
      transform: {
        file: resourcePath,
        type: options.transform
      },
      format: {
        type: options.format,
        options: options.formatOptions
      }
    }).then(theoOutput => {
      // We return the raw output of Theo
      // and count on downstream loaders to handle it
      // when it is not json or a js module (e.g. css-loader)
      // also needs downstream `raw-loader`
      // OR `type: 'javascript/auto'` in the loader rule
      callback(null, theoOutput);
    }).catch(callback);
  } catch (e) {
    callback(e);
    return undefined;
  }

  return undefined; // async
}

function watchTheoImports(filePath, addWebpackDependency, logger) {
  // We lean on Theo to handle file loading (since it covers yaml, json).
  // I'd rather have used webpack loader chaining,
  // but this is ready made, batteries included, and already a dependency.
  const {
    imports
  } = (0, _theo.loadAndParse)(filePath);

  if (!imports) {
    return;
  }

  imports.forEach(importPath => {
    const importPathAbs = path.resolve(path.dirname(basePath), importPath); // Tell webpack to watch imported files

    addWebpackDependency(importPathAbs); // logger.info('theo-loader is watching ' + importPathAbs);
    // Now add *this* file's dependencies

    watchTheoImports(importPathAbs, addWebpackDependency, logger);
  });
}

;