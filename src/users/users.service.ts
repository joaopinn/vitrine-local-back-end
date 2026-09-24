import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import type { User } from "../generated/prisma/client";

const scrypt = promisify(scryptCallback);
type PublicUser = Omit<User, "passwordHash">;

const publicUserFields = {
  id: true,
  name: true,
  email: true,
  phone: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<PublicUser> {
    const { name, email, password, phone } = createUserDto;

    if (!name?.trim() || !email?.trim() || !password || password.length < 8) {
      throw new BadRequestException(
        "Informe nome, email e uma senha de pelo menos 8 caracteres.",
      );
    }

    const salt = randomBytes(16).toString("hex");
    const hash = (await scrypt(password, salt, 64)) as Buffer;

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

  async findAll(): Promise<PublicUser[]> {
    return this.prisma.user.findMany({ select: publicUserFields });
  }

  async findOne(id: number): Promise<PublicUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: publicUserFields,
    });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<PublicUser> {
    const { name, email, password, phone } = dto;

    let passwordHash: string | undefined;

    if (password !== undefined) {
      const salt = randomBytes(16).toString("hex");
      const hash = (await scrypt(password, salt, 64)) as Buffer;
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

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
