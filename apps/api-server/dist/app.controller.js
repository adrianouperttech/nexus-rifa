"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello(res) {
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nexus Rifa API</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f4f6fb; color: #1f2937; }
      .hero { background: linear-gradient(135deg, #2a61ff, #001f70); color: white; padding: 38px 20px; text-align: center; }
      .container { max-width: 960px; margin: 24px auto; padding: 0 16px; }
      .card { background: white; border-radius: 12px; box-shadow: 0 10px 28px rgba(15, 23, 42, 0.12); padding: 20px; margin-bottom: 16px; }
      .grid { display: grid; grid-gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
      h1, h2 { margin: 0; }
      p { color: #475569; }
      a { color: #1d4ed8; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .badge { display: inline-block; background: #e0e7ff; color: #1e3a8a; padding: 4px 10px; border-radius: 999px; font-weight: 600; font-size: 12px; }
      code { background: #e2e8f0; padding: 3px 6px; border-radius: 5px; }
      .footer { text-align: center; padding: 16px; color: #94a3b8; font-size: 13px; }
    </style>
  </head>
  <body>
    <div class="hero">
      <h1>Nexus Rifa API</h1>
      <p>Backend em funcionamento</p>
      <div class="badge">Status: Online</div>
    </div>
    <div class="container">
      <div class="card">
        <h2>Endpoints disponíveis</h2>
        <div class="grid">
          <div>
            <strong>/</strong>
            <p>Página de status</p>
          </div>
          <div>
            <strong>/health</strong>
            <p>Verificação de saúde (JSON)</p>
          </div>
          <div>
            <strong>/status</strong>
            <p>Informações do app (uptime)</p>
          </div>
          <div>
            <strong>/docs</strong>
            <p>Swagger UI para API</p>
          </div>
          <div>
            <strong>/auth/login</strong>
            <p>Login JWT</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Como testar</h2>
        <p>Use suas credenciais de usuário reais ou crie um usuário no banco de dados de teste.</p>
        <p>Não exiba credenciais de contas reais ou de seeds em ambientes públicos.</p>
        <p>Exemplo:</p>
        <code>POST /auth/login</code> com JSON:
        <pre>{"email":"seu-email@example.com","password":"sua-senha","tenant_id":"<tenant-id>"}</pre>
      </div>

      <div class="card">
        <h2>Configuração do frontend</h2>
        <p>Em produção, aponte para a URL do backend real:</p>
        <code>VITE_API_BASE_URL=https://seu-backend.onrender.com</code>
      </div>
    </div>
    <div class="footer">Nexus Rifa &copy; 2026 | backend powered by NestJS</div>
  </body>
</html>`;
        res.contentType('text/html');
        res.send(html);
    }
    getHealth() {
        return { status: 'ok' };
    }
    getStatus() {
        return { app: 'nexus-rifa', uptime: process.uptime() };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getStatus", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map