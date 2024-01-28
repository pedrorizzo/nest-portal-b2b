import { UnprocessableEntityException } from '@nestjs/common';

/**
 * Handle error 422 business rule
 */
export function handleUnprocessableEntity(message: string) {
  throw new UnprocessableEntityException(message);
}
