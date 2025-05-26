import { assertEquals, assertThrows } from "@std/assert";
import { fromHex } from "./fromHex.ts";

Deno.test("empty string", () => {
  const expected = new Uint8Array();

  const actual = fromHex("");

  assertEquals(actual, expected);
});

Deno.test("single byte", () => {
  const expected = new Uint8Array([0x01]);

  const actual = fromHex("01");

  assertEquals(actual, expected);
});

Deno.test("multiple bytes", () => {
  const expected = new Uint8Array([0x01, 0x02, 0x03, 0x04]);

  const actual = fromHex("01020304");

  assertEquals(actual, expected);
});

Deno.test("half byte", () => {
  assertThrows(() => fromHex("0"), Error);
});
