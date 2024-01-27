import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindClientRequestDto {
  @ApiProperty({
    name: 'id',
    type: 'string',
    required: true,
    description: 'client identification code',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
