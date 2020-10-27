/**
 * @jest-environment node
 */
import { compilerRun } from './compiler.js';

function grabModuleSource (stats) {
    return stats.toJson().modules[0].source;
}

test('Compiles tokens as common.js (under default settings)', async () => {
  const webpackStats = await compilerRun('./fixtures/simple/tokens.json');
  const output = grabModuleSource(webpackStats);
  expect(output).toBe('module.exports = {\n  colorLink: "rgb(190, 223, 241)",\n};');
});

test('Compiles tokens as module.js (e.g. ES Modules)', async () => {
    const webpackStats = await compilerRun(
        './fixtures/simple/tokens.json',
        { format: 'module.js' }
    );
    const output = grabModuleSource(webpackStats);
    expect(output).toBe('export const colorLink = "rgb(190, 223, 241)";');
});

/* TODO:
test('Compiles tokens with nested JSON `imports` AND recompiles on changes to those files', async () => {
    const buildCount = 0;
    const watching = compilerWatch(
        './fixtures/simple/tokens.json',
        null,
        null,
        (err, webpackStats) => {
            if (buildCount === 0) {
                const output = grabModuleSource(webpackStats);
                expect(output).toBe(
                    'module.exports = {' +
                    '\n  colorGreen: "rgb(147, 232, 101)",' +
                    '\n  colorLink: "rgb(190, 223, 241)",' +
                    '\n  spaceBase: "20px",\n};'
                );
                // TODO Modify colors-lv2 to new hex value
            } else if (buildCount === 1) {
                // IT rebuilds when dependencies change
                // expect colorGreen to be new hex value
                // TODO Modify colors to remove import
            } else if (buildCount === 2) {
                // IT updates dependencies when import is removed
                // expect colorGreen to go away
                // TODO Modify colors-lv2 to new hex value
            } else if (buildCount === 3) {
                // IT doesn't continue watching removed dependencies
                // expect not to trigger this since colors-lv2
                // should no longer be watched
            }
            // TODO IMPORTANT watching.close()
        }
    )
});
*/

// Imports yaml and nested yaml

// Handles mixed imports (json, json5, yaml)

// Resolves aliases

// Allows passing formatOptions, e.g. the example casing function

// Imports scss as string (from javascript)

// Compiles custom-properties.css from css

// CSS modules?

// Handles query string calls

// Handles chaining upstream loaders


// ERRORS

// errors on bad options

// errors on malformed token file

// errors on missing import
