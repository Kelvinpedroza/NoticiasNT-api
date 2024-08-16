import { IsDateString, IsNumber, IsString, IsUUID, MaxLength, MinLength } from "class-validator"

export class CreateCommentDto {
    @IsUUID()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    userName: string


    @IsString()
    @MinLength(3)
    @MaxLength(256)
    description: string

    @IsNumber()
    rating: number

    @IsDateString()
    created_at: Date

    @IsDateString()
    deleted_at: Date
}

export interface findAllParameters {
    title: string
    status: string
}