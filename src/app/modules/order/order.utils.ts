import crypto from 'crypto';

export function generateTransactionId(): string {
  const timestamp = Date.now().toString(); // Current timestamp in milliseconds
  const randomPart = crypto.randomBytes(4).toString('hex');
  return `TXN-${timestamp}-${randomPart}`;
}
