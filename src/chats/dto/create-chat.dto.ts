import { IsString, IsNotEmpty } from "class-validator";

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  user_from: string;

  @IsString()
  @IsNotEmpty()
  user_to: string;

  created_at: Date;
}
