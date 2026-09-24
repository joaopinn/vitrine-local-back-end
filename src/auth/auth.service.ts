import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { promisify } from "node:util";
import { scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";

const scrypt = promisify(scryptCallback);

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const [salt, savedHash] = user.passwordHash.split(":");
    if (!salt || !savedHash) {
      throw new UnauthorizedException("Senha incorreta");
    }

    const suppliedHash = (await scrypt(password, salt, 64)) as Buffer;
    const expectedHash = Buffer.from(savedHash, "hex");

    if (
      suppliedHash.length !== expectedHash.length ||
      !timingSafeEqual(suppliedHash, expectedHash)
    ) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
