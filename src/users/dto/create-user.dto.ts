import { Type } from "class-transformer";
import { IsString, IsInt, IsPositive } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsInt()
    @IsPositive()
    @Type(() => Number)
    age: number;

    @IsString()
    email: string;
}