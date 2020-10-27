import { validate } from 'schema-utils';

// Theo accepts a config object.
// https://github.com/salesforce-ux/theo#api
//
// We mostly want to pass that through from loader config to theo.
// We do drop `file` and `data` as the loader + webpack will be handling that.
//
// Below we've mapped the types from Theo's docs to a flatter
// loader config descrbed by a JSON Schemas.

export const convertOptionsSchema = {
    type: 'object',
    properties: {
        transform: {
            type: 'string',
            default: 'web',
            description: 'The transform logic for tokens (e.g. transforming color formats, pixel values)',
        },
        format: {
            type: 'string',
            default: 'common.js',
            description: 'The output format for Theo tokens. ' +
                'E.g. "common.js" or "scss" or "custom-properties.css"',
        },
        formatOptions: {
            type: 'object',
            additionalProperties: true,
            description: 'Pass additional configuration to the formatter.',
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
            default: false,
        },
    },
    additionalProperties: false
}

const defaultOptions = {
    transform: 'web',
    format: 'common.js',
    formatOptions: {},
    resolveMetaAliases: false
}

export function prepareOptions (userOptions) {
    const options = {...defaultOptions, ...userOptions};
    validate(convertOptionsSchema, options, 'Theo Loader');
    return options;
}
