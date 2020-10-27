import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

export const theoLoaderPath = path.resolve(__dirname, '../src/index.js');

/** Return modified object from function so each test gets its own */
function getDefaultRules (options) {
    return [{
        test: /tokens.*\.(json5?|ya?ml)$/,
        use: {
            loader: theoLoaderPath,
            options,
        },
        type: 'javascript/auto'
    }];
}

/**
 *
 * @param {string} entryFile - path to test fixture entry file
 * @param {object} loaderOptions - options to pass to the default webpack rules
 * @param {array} webpackRules - array of webpack rules, *overrides loaderOptions*
 */
export function getCompiler (entryFile, loaderOptions, webpackRules) {
  const rules = webpackRules || getDefaultRules(loaderOptions);
  const compiler = webpack({
    context: __dirname,
    entry: `./${entryFile}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
        rules
    }
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return compiler;
};


export function compilerRun (entryFile, loaderOptions, webpackRules) {
    const compiler = getCompiler(entryFile, loaderOptions, webpackRules);

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
          if (err) reject(err);
          if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

          resolve(stats);
        });
    });
}

export function compilerWatch (entryFile, loaderOptions, webpackRules, onBuildCallback) {
    const compiler = getCompiler(entryFile, loaderOptions, webpackRules);

    return compiler.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => { // [Stats Object](#stats-object)
        onBuildCallback(err, stats);
        console.log('watch completed build');
        console.log(stats);
    });
}
