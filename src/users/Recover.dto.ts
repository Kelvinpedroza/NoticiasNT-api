import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator"


export class RecoverDto{
    @IsEmail()
    email?: string

    @IsString()
    firstQuestion?: string

    @IsString()
    secondQuestion?: string

    @IsOptional()
    recoverPasswordToken?: string
}