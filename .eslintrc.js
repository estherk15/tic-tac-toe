module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
        "es6": true,
        "mocha": true,

    },
    "extends": "eslint-config-google",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "no-console": 1,
      "complexity": ["error", 5],
      "max-len": ["error", {
        "ignoreTrailingComments": true,
      }],

    }
};
