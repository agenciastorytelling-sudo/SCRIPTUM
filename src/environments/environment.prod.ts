export const environment = {
  production: true,
  apiUrl: '/api',
  discordClientId: process.env['DISCORD_CLIENT_ID'] || '',
  discordRedirectUri: process.env['DISCORD_REDIRECT_URI'] || '',
  mercadoPagoPublicKey: process.env['MP_PUBLIC_KEY'] || '',
  frontendBaseUrl: process.env['FRONTEND_BASE_URL'] || '',
  backendBaseUrl: process.env['BACKEND_BASE_URL'] || ''
};