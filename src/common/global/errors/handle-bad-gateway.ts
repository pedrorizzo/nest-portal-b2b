import { BadGatewayException } from '@nestjs/common';

/**
 * Handle error 502 business rule
 */
export function handleBadGateway(message: string) {
  throw new BadGatewayException(message);
}
