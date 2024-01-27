import {
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export abstract class BaseValidationPipe implements PipeTransform<any> {
  constructor(
    @Inject(REQUEST) protected request: Request,
    private allowEmpty: boolean = true,
  ) {}

  /**
   * Valdiate
   */
  abstract validate(data: any): any;

  /**
   * Transform data
   */
  async transform(value: any) {
    if (value instanceof Object && this.isEmpty(value)) {
      if (this.allowEmpty === false) {
        throw new BadRequestException('Validation failed: no body provided');
      }
    }
    return value;
  }

  private isEmpty(value: any) {
    return !(Object.keys(value).length > 0);
  }
}
