import { InternalServerErrorException } from '@nestjs/common';

/**
 * Handle error 500 business rule
 */
export function handleInternalServerError(message: string) {
  throw new InternalServerErrorException(message);
}
