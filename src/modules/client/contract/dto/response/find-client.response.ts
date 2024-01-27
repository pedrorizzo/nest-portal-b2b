import { ClientEntity } from 'src/data/dababase/entities/client.entity';

export class FindClientResponseDto {
  id: string;
  corporateName: string;
  fantasyName: string;
  document: string;
  email: string;
  phone: string;
  cellphone: string;
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
