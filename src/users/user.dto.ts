import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator"


export class UserDto {
    @IsUUID()
    @IsOptional()
    id?: string

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    userName: string

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    password: string

    @IsEmail()
    email: string

    @IsString()
    firstQuestion: string

    @IsString()
    secondQuestion: string

    @IsOptional()
    recoverPasswordToken?: string

    @Type(() => Date)
    created_at?: Date

    @Type(() => Date)
    deleted_at?: Date

    @Type(() => Date)
    updated_at?: Date
}