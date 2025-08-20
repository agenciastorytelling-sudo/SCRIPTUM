export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  discordClientId: process.env['DISCORD_CLIENT_ID'] || '',
  discordRedirectUri: process.env['DISCORD_REDIRECT_URI'] || 'http://localhost:4200/auth/callback',
  mercadoPagoPublicKey: process.env['MP_PUBLIC_KEY'] || '',
  frontendBaseUrl: 'http://localhost:4200',
  backendBaseUrl: 'http://localhost:3000'
};