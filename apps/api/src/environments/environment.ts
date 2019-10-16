import { resolve } from 'path';

export const environment = {
  production: false,
  stage: 'local',

  // auth environments
  refreshTokenLife: '1d',
  accessTokenLife: 3600,
  refreshTokenSecret: 'karma123',
  accessTokenSecret: 'karma123',

  // bcrypto
  saltRounds: 10,

  // graphql
  schemaPath : 'apps/api/schema.graphql',

  // email
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PW,
    smtp: process.env.EMAIL_SMTP_PROVIDER,

    registrationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    forgotPasswordExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    invitationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 72, // 72h valid

    templateDirectory: resolve(
      __dirname,
      '../../..',
      'apps/server/src/app/email/templates'
    )
  },

  appDomain: 'http://localhost:4200/'
};
