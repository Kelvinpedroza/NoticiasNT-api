import { Type } from "class-transformer";
import { IsDateString, IsISO8601, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator"

export class CreateCommentDto {
  @IsUUID()
  id?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  userName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  description: string;

  @IsString()
  rating: string;

  @Type(() => Date)
  created_at?: Date;

  @Type(() => Date)
  deleted_at?: Date;
}

export interface findAllParameters {
    title: string
    status: string
}