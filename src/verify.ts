import * as uint8ArrayUtil from "./uint8Array/mod.ts";

export async function verify(
  body: ArrayBuffer,
  signature: string,
  timestamp: string,
  publicKey: string,
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    uint8ArrayUtil.fromHex(publicKey),
    { name: "ed25519" },
    false,
    ["verify"],
  );
  const signatureBytes = uint8ArrayUtil.fromHex(signature);
  const timestampBytes = new TextEncoder().encode(timestamp);

  const data = uint8ArrayUtil.concat(timestampBytes, new Uint8Array(body));

  return crypto.subtle.verify({ name: "ed25519" }, key, signatureBytes, data);
}
