import { GatewayTimeoutException } from '@nestjs/common';

/**
 * Handle error 504 business rule
 */
export function handleGatewayTimeout(message: string) {
  throw new GatewayTimeoutException(message);
}
