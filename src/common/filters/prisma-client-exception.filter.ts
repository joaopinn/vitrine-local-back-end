import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      // P2002: Unique constraint failed (ex: e-mail duplicado)
      case 'P2002': {
        const status = HttpStatus.CONFLICT; // 409
        response.status(status).json({
          statusCode: status,
          error: 'Conflict',
          message: 'E-mail já cadastrado no sistema.',
        });
        break;
      }

      // P2025: Record to update/delete not found (ex: ID inexistente)
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND; // 404
        response.status(status).json({
          statusCode: status,
          error: 'Not Found',
          message: 'Registro não encontrado no banco de dados.',
        });
        break;
      }

      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro interno no banco de dados.',
        });
        break;
    }
  }
}