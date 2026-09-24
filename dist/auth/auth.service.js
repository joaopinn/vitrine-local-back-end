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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const node_util_1 = require("node:util");
const node_crypto_1 = require("node:crypto");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const scrypt = (0, node_util_1.promisify)(node_crypto_1.scrypt);
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email: email.trim().toLowerCase() },
        });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException("Credenciais inválidas");
        }
        const [salt, savedHash] = user.passwordHash.split(":");
        if (!salt || !savedHash) {
            throw new common_1.UnauthorizedException("Senha incorreta");
        }
        const suppliedHash = (await scrypt(password, salt, 64));
        const expectedHash = Buffer.from(savedHash, "hex");
        if (suppliedHash.length !== expectedHash.length ||
            !(0, node_crypto_1.timingSafeEqual)(suppliedHash, expectedHash)) {
            throw new common_1.UnauthorizedException("Credenciais inválidas");
        }
        return {
            access_token: await this.jwtService.signAsync({
                sub: user.id,
                email: user.email,
            }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map