import { ApiResponseProperty } from '@nestjs/swagger';
import { ClientEntity } from 'src/data/dababase/entities/client.entity';

export class FindClientResponseDto {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  corporateName: string;

  @ApiResponseProperty({ type: String })
  fantasyName: string;

  @ApiResponseProperty({ type: String })
  document: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  phone: string;

  @ApiResponseProperty({ type: String })
  cellphone: string;

  @ApiResponseProperty({ type: Boolean })
  isActive: boolean;

  public static create(): FindClientResponseDto {
    return new FindClientResponseDto();
  }

  public static fromObject(entity: ClientEntity): FindClientResponseDto {
    const instance = FindClientResponseDto.create();
    Object.keys(entity).forEach((key) => {
      instance[key] = entity[key];
    });
    return instance;
  }
}
