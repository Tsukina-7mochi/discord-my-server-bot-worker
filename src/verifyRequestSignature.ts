import * as uint8ArrayUtil from "./uint8Array/mod.ts";

const encoder = new TextEncoder();

function createCryptoKey(key: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { "name": "Ed25519" },
    false,
    ["verify"],
  );
}

function verifySignature(
  key: CryptoKey,
  signature: Uint8Array,
  data: Uint8Array,
): Promise<boolean> {
  return crypto.subtle.verify("Ed25519", key, signature, data);
}

export async function verifyRequestSignature(
  headers: Headers,
  body: Uint8Array,
  publicKey: string,
): Promise<boolean> {
  const signatureStr = headers.get("X-Signature-Ed25519");
  if (!signatureStr) return false;
  const signature = uint8ArrayUtil.fromHex(signatureStr);

  const timestampStr = headers.get("X-Signature-Timestamp");
  if (!timestampStr) return false;
  const timestamp = encoder.encode(timestampStr);

  const fullBody = uint8ArrayUtil.concat(timestamp, body);

  const cryptoKey = await createCryptoKey(publicKey);
  const result = await verifySignature(cryptoKey, signature, fullBody);

  return result;
}
