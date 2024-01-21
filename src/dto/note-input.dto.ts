import { IsNotEmpty, IsString } from "class-validator";

export class NoteInputDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;
}
