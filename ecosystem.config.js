module.exports = {
  apps: [
    {
      name: 'base-graphql-api',
      script: './build/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
