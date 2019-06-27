const config = require('../config');

const GLOBALS = config.globals;
Object.keys(config.globals).forEach((key) => {
    GLOBALS[key] = false;
});

module.exports = {
    "extends": ["airbnb", "plugin:jest/recommended"],
    "env": {
        "browser": true,
        "node": true,
    },
    "globals": GLOBALS,
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        "linebreak-style": "off",
        "no-underscore-dangle": ["error", {
            "allow": [
                "__PRELOADED_STATE__",
                "__REDUX_DEVTOOLS_EXTENSION__",
                "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__",
                "_id",
            ]
        }],
        "no-nested-ternary": 0,
        "no-cond-assign": 0,
        "brace-style": ["error", "stroustrup"],
        
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/prop-types": 0,
        "react/no-array-index-key": 0,
        "react/destructuring-assignment": [1, "always"],
        "react/no-did-update-set-state": 1,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],

        "import/extensions": 0,
        "import/prefer-default-export": 0,
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    },
};