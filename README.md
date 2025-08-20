# FrontSkriptum

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Funcionalidades Implementadas

### Autenticação
- Login com Discord OAuth2
- Gerenciamento de sessão com JWT
- Guards de rota para áreas protegidas
- Logout seguro

### Dashboard do Cliente
- **Whitelist de IPs**: Adicionar, listar e remover IPs autorizados
- **Minhas Licenças**: Visualizar scripts ativos e expirados
- **WhatsApp Bot IA**: Configurar instância, API key e webhook
- Interface responsiva com abas organizadas

### Catálogo de Scripts
- Lista de scripts com filtros e busca
- Sistema de compra com QR Code Pix
- Polling automático para status de pagamento
- Cards informativos com preços e status

### Arquitetura
- Serviços Angular para API e autenticação
- Guards para proteção de rotas
- Modelos TypeScript para tipagem
- Componentes modulares e reutilizáveis
- SCSS puro seguindo o design system existente

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env` na raiz do projeto backend com:

```env
# Discord OAuth2
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:4200/auth/callback

# JWT
JWT_SECRET=your_jwt_secret_key

# Mercado Pago
MP_ACCESS_TOKEN=your_mercado_pago_access_token
MP_PUBLIC_KEY=your_mercado_pago_public_key
MP_WEBHOOK_SECRET=your_webhook_secret

# URLs
FRONTEND_BASE_URL=http://localhost:4200
BACKEND_BASE_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_connection_string
```

## Rotas Implementadas

### Frontend
- `/` - Página inicial
- `/login` - Login com Discord
- `/auth/callback` - Callback do Discord OAuth2
- `/scripts` - Catálogo de scripts
- `/dashboard` - Dashboard do cliente (protegido)
- `/admin` - Área administrativa (protegido, apenas ADMIN)

### Backend (APIs necessárias)
- `POST /api/auth/discord/callback` - Processar callback do Discord
- `GET /api/scripts` - Listar scripts
- `GET /api/rentals/my` - Minhas licenças
- `GET /api/whitelist/my` - Minha whitelist
- `POST /api/whitelist` - Adicionar IP
- `DELETE /api/whitelist/:id` - Remover IP
- `GET /api/whatsapp/my` - Configuração WhatsApp
- `POST /api/whatsapp` - Salvar configuração WhatsApp
- `POST /api/whatsapp/test` - Testar WhatsApp
- `POST /api/payments/checkout` - Criar checkout Pix
- `GET /api/payments/:id/status` - Status do pagamento
- `POST /api/webhooks/mercadopago` - Webhook Mercado Pago

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/e2b13b74-ec9e-4192-8e75-7043315f91e8" />

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/e95c0288-5169-4a7a-ac23-3816dd572764" />

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/733d38e1-426d-4c14-973b-820119ec9e44" />


