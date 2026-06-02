import { IsString, Length } from "class-validator";

export class CreateMarcaDto {

    @IsString({message: 'El nombre no es válido.'})
    @Length(3, 255,{message: 'El nombre debe tener al menos 3 letras.'})
    name!: string

    @IsString({message: 'La descripción no es válida'})
    @Length(3, 255, {message: 'La descripción debe tener al menos 3 letras.'})
    description!: string

}