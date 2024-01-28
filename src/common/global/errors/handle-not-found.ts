import { NotFoundException } from '@nestjs/common';

/**
 * Handle error 404 business rule
 */
export function handleNotFound(message: string) {
  throw new NotFoundException(message);
}
