import { NotFoundException } from '@nestjs/common';

/**
 * Handle error 404 business rule
 */
export function handleNotFound(result: any, message?: string) {
  if (!result) {
    throw new NotFoundException(message ?? 'Entity not found');
  }
}

export function throwNotFound(message?: string) {
  throw new NotFoundException(message ?? 'Entity not found');
}
