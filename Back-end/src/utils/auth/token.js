import crypto from "crypto";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const generateResetToken = async () => {
  const token = uuidv4(); // Generate a random token
  const hashedToken = await bcrypt.hash(token, 10); // Hash the token
  const expiresAt = Date.now() + 15 * 60 * 1000; // Token expires in 15 minutes

  return { token, hashedToken, expiresAt }; // Send plain token to user, store hashedToken
};

export const verifyResetToken = async (
  receivedToken,
  storedHashedToken,
  expiresAt
) => {
  if (Date.now() > expiresAt) {
    return { valid: false, message: "Token expired" };
  }

  const isMatch = await bcrypt.compare(receivedToken, storedHashedToken);
  if (!isMatch) {
    return { valid: false, message: "Invalid token" };
  }

  return { valid: true, message: "Token verified" };
};
