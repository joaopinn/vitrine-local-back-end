import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsString,
  MaxLength,
  MinLength,
  IsMobilePhone,
  IsOptional,
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

  @IsString()
  @IsOptional()
  @IsMobilePhone('pt-BR', {}, {
    message: 'Informe um telefone brasileiro válido'
  })
  @Matches(/^\d{11}$/, {
    message: "Informe o seu DDD + Telefone ( sem símbolos e espaços )"
  })
  phone?: string;
}
