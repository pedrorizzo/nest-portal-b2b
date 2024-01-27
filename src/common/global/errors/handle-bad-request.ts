import { BadRequestException } from '@nestjs/common';

/**
 * Handle error 400 business rule
 */
export function handleBadRequest(message: string) {
  throw new BadRequestException(message);
}
