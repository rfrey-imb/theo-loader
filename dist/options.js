"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareOptions = prepareOptions;
exports.convertOptionsSchema = void 0;

var _schemaUtils = require("schema-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Theo accepts a config object.
// https://github.com/salesforce-ux/theo#api
//
// We mostly want to pass that through from loader config to theo.
// We do drop `file` and `data` as the loader + webpack will be handling that.
//
// Below we've mapped the types from Theo's docs to a flatter
// loader config descrbed by a JSON Schemas.
const convertOptionsSchema = {
  type: 'object',
  properties: {
    transform: {
      type: 'string',
      default: 'web',
      description: 'The transform logic for tokens (e.g. transforming color formats, pixel values)'
    },
    format: {
      type: 'string',
      default: 'common.js',
      description: 'The output format for Theo tokens. ' + 'E.g. "common.js" or "scss" or "custom-properties.css"'
    },
    formatOptions: {
      type: 'object',
      additionalProperties: true,
      description: 'Pass additional configuration to the formatter.'
    },

    /*
     * The `resolveAliases` option configures theo to resolve aliases.
     * It is set (true) by default and currently CANNOT be disabled.
     * So no need to include in schema.
     */
    // resolveAliases: { type: 'boolean', }
    resolveMetaAliases: {
      type: 'boolean',
      description: 'This option configures theo to resolve aliases in metadata. This is off (false) by default.',
      default: false
    }
  },
  additionalProperties: false
};
exports.convertOptionsSchema = convertOptionsSchema;
const defaultOptions = {
  transform: 'web',
  format: 'common.js',
  formatOptions: {},
  resolveMetaAliases: false
};

function prepareOptions(userOptions) {
  const options = _objectSpread(_objectSpread({}, defaultOptions), userOptions);

  (0, _schemaUtils.validate)(convertOptionsSchema, options, 'Theo Loader');
  return options;
}