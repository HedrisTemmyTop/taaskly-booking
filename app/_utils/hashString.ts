import crypto from "crypto";

// Key and Initialization Vector (IV)
const algorithm = "aes-256-cbc";
const secretKey = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16); // 128-bit IV

// Encrypt function
export function encrypt(text: string): { encryptedData: string; iv: string } {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedData: encrypted, iv: iv.toString("hex") };
}

// Decrypt function
export function decrypt(encryptedData: string, iv: string): string {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Usage Example
// const { encryptedData, iv } = encrypt('Hello, world!');
// console.log('Encrypted:', encryptedData);

// const decryptedText = decrypt(encryptedData, iv);
// console.log('Decrypted:', decryptedText);
