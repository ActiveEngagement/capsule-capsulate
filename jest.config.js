export default {
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    moduleNameMapper: {
        "^lodash-es$": "lodash"
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        // '^.+\\.js$': 'babel-jest'
    },
    transformIgnorePatterns: [
        'node_modules/(?!(html-chunk|lodash\-es)/)'
    ],
};