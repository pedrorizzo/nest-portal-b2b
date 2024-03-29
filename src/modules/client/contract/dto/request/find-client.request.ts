import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { HasClient } from 'src/modules/client/validators/has-client.validator';

export class FindClientRequestDto {
  @ApiProperty({
    name: 'id',
    type: 'string',
    required: true,
    description: 'client identification code',
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @HasClient()
  id: string;
}
