import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: "A senha tem que ter no mínimo 8 dígitos"
  })
  password: string;

  @MaxLength(11)
  @IsString()
  @Matches(/^\d{10,11}$/, {
    message: "O seu telefone deve conter exatamente 10 a 11 dígitos (DDD + Telefone)"
  })
  phone?: string;
}
