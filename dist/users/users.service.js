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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
const prisma_service_1 = require("../prisma/prisma.service");
const scrypt = (0, node_util_1.promisify)(node_crypto_1.scrypt);
const publicUserFields = {
    id: true,
    name: true,
    email: true,
    phone: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
};
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { name, email, password, phone } = createUserDto;
        if (!name?.trim() || !email?.trim() || !password || password.length < 8) {
            throw new common_1.BadRequestException("Informe nome, email e uma senha de pelo menos 8 caracteres.");
        }
        const salt = (0, node_crypto_1.randomBytes)(16).toString("hex");
        const hash = (await scrypt(password, salt, 64));
        return this.prisma.user.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                passwordHash: `${salt}:${hash.toString("hex")}`,
                phone: phone?.trim() || null,
            },
            select: publicUserFields,
        });
    }
    async findAll() {
        return this.prisma.user.findMany({ select: publicUserFields });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: publicUserFields,
        });
        if (!user) {
            throw new common_1.NotFoundException("Usuário não encontrado");
        }
        return user;
    }
    async update(id, dto) {
        const { name, email, password, phone } = dto;
        let passwordHash;
        if (password !== undefined) {
            const salt = (0, node_crypto_1.randomBytes)(16).toString("hex");
            const hash = (await scrypt(password, salt, 64));
            passwordHash = `${salt}:${hash.toString("hex")}`;
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                ...(name !== undefined && { name: name.trim() }),
                ...(email !== undefined && { email: email.trim().toLowerCase() }),
                ...(phone !== undefined && { phone: phone.trim() }),
                ...(passwordHash !== undefined && { passwordHash }),
            },
            select: publicUserFields,
        });
    }
    async remove(id) {
        await this.prisma.user.delete({
            where: { id },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map