import { compare, hashSync } from 'bcrypt';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} passwordPayload
 * @param {string} passwordHashed
 * @returns {Promise<boolean>}
 */
export async function validateHash(
  passwordPayload: string | undefined,
  passwordHashed: string | undefined | null,
): Promise<boolean> {
  if (!passwordPayload || !passwordHashed) {
    return Promise.resolve(false);
  }

  return compare(passwordPayload, passwordHashed);
}
