import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClientEntity } from 'src/data/dababase/entities';

export class CreateClientRequestDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  corporateName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  fantasyName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  celphone: string;

  toInstance(): ClientEntity {
    const instance = new ClientEntity();

    instance.corporateName = this.corporateName;
    instance.fantasyName = this.fantasyName;
    instance.document = this.document;
    instance.email = this.email;
    instance.phone = this.phone;
    instance.cellphone = this.celphone || null;

    return instance;
  }
}
