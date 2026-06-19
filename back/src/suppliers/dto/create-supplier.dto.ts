import { IsString, IsNotEmpty, IsOptional, IsEmail, Matches } from "class-validator";

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^[0-9]+$/,{message: 'El teléfono debe contener solo números'})
  phone?: string;
}
