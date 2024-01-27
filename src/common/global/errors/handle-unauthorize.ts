import { UnauthorizedException } from '@nestjs/common';

/**
 * Handle error 401 business rule
 */
export function handleUnauthorized(message: string) {
  throw new UnauthorizedException(message);
}
