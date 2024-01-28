import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidatorOptions,
  registerDecorator,
} from 'class-validator';
import { ClientRepository } from 'src/data/dababase/repositories/client.repository';

@ValidatorConstraint({ name: 'HasClientValidator', async: true })
@Injectable()
export class HasClientValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject(ClientRepository)
    private readonly clientRepository: ClientRepository,
  ) {}
  private msg: string = '';

  // eslint-disable-next-line
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const client = await this.clientRepository.findByPrimaryKey(value);
    if (!client) {
      this.msg = `Client with id => ${value} does not exists`;
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return this.msg;
  }
}

export function HasClient(validatorOptions?: ValidatorOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'has-client',
      target: object.constructor,
      propertyName: propertyName,
      options: validatorOptions,
      constraints: [], // possible to give options as first param of function
      validator: HasClientValidator,
    });
  };
}
