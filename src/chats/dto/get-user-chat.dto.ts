import { IsString, IsNotEmpty } from "class-validator";

export class GetUserChatDto {
    @IsString()
    @IsNotEmpty()
    id: string
}
