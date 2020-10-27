# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [5.0.0] (2020)

WIP WORK IN PROGRESS - I can't reccommend you use this fork (or Theo at all honestly)

Updated to:
- Node 12+.
- Webpack 4.
- Theo (v8.1.5).

Updated some other dependencies to latest (as of 2020)
for compatibility with the above

*Rewrote the Loader, Minimally Tested*
- Now supports loading JSON5 and YAML via importing Theo's own file loading functions. `require(theo!./tokens.yaml);`

Wrote a couple new tests with jest and memfs following webpack guidance https://webpack.js.org/contribute/writing-a-loader/#testing

### Breaking Changes and Migration:

- Options format changed.
  - See suggested webpack query or configs in README.md.
  - Schema documented in [./src/options.js]()

- If you are using a `format` that is not js/json,
  they will no longer be converted to a module
  - "common.js", "module.js", "raw", and "json" should work mostly as before
    - you may need a `raw-loader!` prefix if your file extension is json and target is javascript.
  - "custom-properties.css", "sass", "less" and so forth
    will require you to do something with the text they return.
    - ⚠️ import from within css not working - I had some misplaced hope
      to be able to use this raw css text with css-loader or sass-loader
      but those do not seem to use webpack loaders to resolve imports.
    - If you do want Theo's css output to be wrapped into a js
      module you can recreate that behavior by
      chaining `to-string-loader` or `css-loader` in front of `theo-loader`. You could chain `style-loader` to write to document or `file-loader` to write to disk. UNTESTED.

## [4.0.0] (2017)

Updated to Webpack 3.
Updated some other dependencies (2017).

## [3.0.0]

The following changes and additions were made to configuring theo-loader:

- Theo options can now be passed as JSON via query string, e.g. `theo-loader?{“transform”:{“type”:”web”},”format”:{“type”:”sass”}}!./tokens.json`
- The options format passed to the webpack `LoaderOptionsPlugin` has changed: Theo options are specified as they would be to the`theo.convert` function. These options apply to all instances of theo-loader.
- For options that vary on a per-transform, per-format or per-invocation basis, the new `getOptions` function option should be used. `getOptions` receives an initial options object that is the merged contents of the constant options supplied to the LoaderOptionsPlugin and any options supplied via query string. The final options object should be returned.

### :bangbang: Breaking changes with 2.x

- The previous configuration format is no longer supported

## [2.0.0]

- Updated minimum `theo` peerDependency package version to `6.0.0-beta`. ([#87](https://github.com/Autodesk/theo-loader/issues/87))

### :bangbang: Breaking changes with 1.x

#### Updated Theo to v6

Support for previous versions has been dropped. For information on the changes included with theo@6 and how to migrate from previous versions, please see [the Theo documentation](https://raw.githubusercontent.com/salesforce-ux/theo).

**Additional Notes**:

- Node.js v6 or above is required
- Theo no longer has a `json` format, so the default format for theo-loader has been changed to `common.js` which behaves similarly.

## [1.0.0]

- Updated minimum `webpack` peerDependency package version to `2.4.1`

### :bangbang: Breaking changes with 0.x

#### Webpack v2 now required

Webpack 2 is now required for theo-loader. For instructions on upgrading from previous versions of webpack, please see [the migration guide](https://webpack.js.org/guides/migrating/).

**Additional Notes**:

- Options for theo-loader are now specified in the `LoaderOptionsPlugin`
- Props passed to `propsFilter` and `propsMap` format options are now [Immutable.js Maps](https://facebook.github.io/immutable-js/docs/#/Map) instead of plain javascript objects.
