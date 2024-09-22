import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator"


export class RecoverDto{
    email?: string

    firstQuestion?: string

    secondQuestion?: string

    recoverPasswordToken?: string
}