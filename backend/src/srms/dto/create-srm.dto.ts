import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateSrmDto {
    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    adresse: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    telph: string; // Assuming this is a phone number

    @IsNotEmpty()
    admin: string;

    @IsEnum(['active', 'inactive'], { message: 'Status must be either active or inactive' })
    @IsNotEmpty()
    status: string; // Adding status field
}
