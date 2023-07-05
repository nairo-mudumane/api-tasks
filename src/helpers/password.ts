import bcrypt from "bcryptjs";

// SERVER_CONSTANTS

/**
 * Asynchronously generates a hash for the given string.
 * @param str — String to hash
 * @return — Promise with resulting hash, if callback has been omitted
 */
export const hash = async (str: string) => await bcrypt.hash(str, 10);

/**
 * Asynchronously compares the given data against the given hash.
 * @param s — Data to compare
 * @param hash — Data to be compared to
 * @return — Promise, if callback has been omitted
 */
export const match = async (str: string, hash: string) =>
  await bcrypt.compare(str, hash);

export default { hash, match };
