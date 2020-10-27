# Theo Loader for Webpack

**WORK IN PROGRESS BRANCH - DO NOT USE**

A webpack loader that transforms Design Tokens files using [Salesforce's theo](https://github.com/salesforce-ux/theo).

## Installation and Setup

```bash
npm install --save-dev webpack theo theo-loader
```

theo and webpack are peer dependencies
so must be installed into your package.json

## Usage


`tokens/props.json`
```json
{
  "aliases": {
    "light-blue": "#BEDFF1"
  },
  "props": {
    "color-link": {
      "value": "{!light-blue}"
    }
  },
  "global": {
    "type": "color",
    "category": "color"
  }
}
```

### Use an Inline Loader

``` javascript
import designTokens from 'theo!./tokens/props.json'
// designTokens = { colorLink: "rgb(190 223 241)" }
```

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)


### ..._or_ Add a Webpack Loader Rule

Rules are suggested by webpack over inline loaders,
though for files that need to be imported differently
in different contexts, like our tokens, the inline loaders
can be more useful.

`webpack.config.js`
```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        /* matches any json, json5, yaml, or yml file under a tokens path or including tokens in the name. */
        test: /tokens.*\.(json5?|ya?ml)$/,
        loader: "theo-loader"
        // you can pass options as well
        // options will be shared across all token imports
        /* e.g. :
        options: {
            transform: 'web', // e.g. ios, android,
            format: {
                type: 'module.js', // output modules instead of commonjs
            }
        }
        */
      }
    ]
  },
};
```

``` javascript
import designTokens from './tokens/props.json'
// designTokens will be { colorLink: "rgb(190 223 241)" }
```

## Formats and Transforms

The loader uses the `web` transform and `common.js` format by default.

When using non-js formats (e.g. when not raw, json, common.js, modules.js)
be aware you need to chain with a loader to handle strings if requiring from in javascript.

```javascript
import designTokensScss from 'to-string!theo?format=scss!./tokens/props.json?'
// designTokensScss = "$colorLink: rgb(190 223 241)"
// notice we chained to-string-loader https://github.com/gajus/to-string-loader
// in order to make the scss output consumable in javascript
```

You don't need a string loader when importing into a matching non-javascript
context like within css (via css-loader).

#### From CSS (or SASS, LESS, etc):
```css
@import 'theo?format=custom-properties.css!./tokens/props.json';
/*
:root {
  --color-link: rgb(190 223 241);
}
*/
```

See the [theo documentation](https://github.com/salesforce-ux/theo) for more information about the Theo options format.

## theo Initialization

You can perform any initialization for theo, like registering custom transforms or formatters using `registerTransform`, `registerValueTransform` or `registerFormat`, in your webpack configuration:

```javascript
import theo from 'theo';

// Do any theo initialization here
theo.registerValueTransform(
  'animation/web/curve',
  prop => prop.get('type') === 'animation-curve',
  prop => 'cubic-bezier(' + prop.get('value').join(', ') + ')'
);

module.exports = {
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "theo-loader"
      }
    ]
  },
}
```
