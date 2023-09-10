export const CONFIG = {
  env: process.env.APP_ENV,
  authorization: {
    username: process.env.AUTHORIZATION_USERNAME,
    passsword: process.env.AUTHORIZATION_PASSWORD
  },
  session: {
    secret: process.env.SESSION_SECRET || 'session-secret',
    name: process.env.SESSION_NAME || 'session'
  },
  baseUrlApi: process.env.BASE_API_URL
}
