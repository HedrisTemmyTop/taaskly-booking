import { subtle } from "crypto"; // Import subtle for TypeScript support

const algorithm = "AES-CBC"; // AES with CBC mode
const keyHex = process.env.ENCRYPTION_KEY; // Your existing key in hex format

// Convert hex string to ArrayBuffer
function hexStringToArrayBuffer(hex: string): ArrayBuffer {
  const buffer = new Uint8Array(
    hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
  return buffer.buffer;
}

// Create a CryptoKey from the hex string
async function getCryptoKey(): Promise<CryptoKey> {
  const keyData = hexStringToArrayBuffer(keyHex!); // Ensure the key is not undefined
  return await subtle.importKey("raw", keyData, { name: algorithm }, false, [
    "encrypt",
    "decrypt",
  ]);
}

// Encryption function
export async function encrypt(
  text: string
): Promise<{ encryptedData: string; iv: string }> {
  const iv = crypto.getRandomValues(new Uint8Array(16)); // 16 bytes IV for AES-CBC
  const encodedText = new TextEncoder().encode(text);
  const key = await getCryptoKey(); // Get the CryptoKey

  const encryptedBuffer = await subtle.encrypt(
    {
      name: algorithm,
      iv: iv,
    },
    key,
    encodedText
  );

  const encryptedData = new Uint8Array(encryptedBuffer);
  return {
    encryptedData: Buffer.from(encryptedData).toString("hex"),
    iv: Buffer.from(iv).toString("hex"),
  };
}

// Decryption function
export async function decrypt(
  encryptedDataHex: string,
  ivHex: string
): Promise<string> {
  const encryptedData = new Uint8Array(Buffer.from(encryptedDataHex, "hex"));
  const iv = new Uint8Array(Buffer.from(ivHex, "hex"));
  const key = await getCryptoKey(); // Get the CryptoKey

  const decryptedBuffer = await subtle.decrypt(
    {
      name: algorithm,
      iv: iv,
    },
    key,
    encryptedData
  );

  const decryptedText = new TextDecoder().decode(decryptedBuffer);
  return decryptedText;
}
