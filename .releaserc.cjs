require('dotenv').config();

module.exports = {
    branches: [
        'main',
        {
            name: 'beta',
            channel: 'beta',
            prerelease: true,
        },
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        "@semantic-release/npm",
        '@semantic-release/changelog',
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'package.json'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
        [
            '@semantic-release/github',
            {
              "successComment": false,
              "failTitle": false
            }          
        ],
    ],
};
