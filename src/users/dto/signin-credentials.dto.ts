import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignInCredentialsDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
