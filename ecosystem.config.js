module.exports = {
  apps: [
    {
      name: 'base-graphql-api',
      script: 'yarn',
      args: 'start',
      interpreter: '/bin/bash',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
