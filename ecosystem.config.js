module.exports = {
  apps: [
    {
      name: 'base-graphql-api',
      script: 'node -r ts-node/register/transpile-only -r tsconfig-paths/register build/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
