async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

// The decrypted model is kept in memory, so when you come BACK to the home page
// it does not have to be downloaded and decrypted again.
const cache = new Map<string, Promise<ArrayBuffer>>();

export const decryptFile = (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  const key = url + "|" + password;
  let result = cache.get(key);
  if (!result) {
    result = (async () => {
      const response = await fetch(url);
      const encryptedData = await response.arrayBuffer();
      const iv = new Uint8Array(encryptedData.slice(0, 16));
      const data = encryptedData.slice(16);
      const aesKey = await generateAESKey(password);
      return crypto.subtle.decrypt({ name: "AES-CBC", iv }, aesKey, data);
    })();
    // if it failed, do not keep the failed result
    result.catch(() => cache.delete(key));
    cache.set(key, result);
  }
  return result;
};