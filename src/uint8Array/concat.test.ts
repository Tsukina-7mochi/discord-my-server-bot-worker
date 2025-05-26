import { assertEquals } from "@std/assert";
import { concat } from "./concat.ts";

Deno.test("no arrays", () => {
  const expected = new Uint8Array();

  const actual = concat();

  assertEquals(actual, expected);
});

Deno.test("empty arrays", () => {
  const expected = new Uint8Array();

  const actual = concat(
    new Uint8Array(),
    new Uint8Array(),
  );

  assertEquals(actual, expected);
});

Deno.test("concatenate two arrays", () => {
  const arr1 = new Uint8Array([1, 2, 3]);
  const arr2 = new Uint8Array([4, 5, 6]);
  const expected = new Uint8Array([1, 2, 3, 4, 5, 6]);

  const actual = concat(arr1, arr2);

  assertEquals(actual, expected);
});
