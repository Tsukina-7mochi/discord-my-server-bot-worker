import { Result, ResultAsync } from "neverthrow";
import { verify } from "./verify.ts";
import { Interaction } from "./types/interaction.ts";
import { routeInteraction } from "./router.ts";

const decoder = new TextDecoder();

const safeJsonParse = Result.fromThrowable(JSON.parse);

export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    _ctx: unknown,
  ): Promise<Response> {
    const publicKey = env.BOT_PUBLIC_KEY;
    if (typeof publicKey !== "string") {
      console.error("Missing bot public key");
      return new Response("Internal Server Error", { status: 500 });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/") {
      return new Response("Not Found", { status: 404 });
    }

    const signature = request.headers.get("X-Signature-Ed25519");
    const timestamp = request.headers.get("X-Signature-Timestamp");

    if (!signature) {
      return new Response("X-Signature-Ed25519 header missing", {
        status: 401,
      });
    }
    if (!timestamp) {
      return new Response("X-Signature-Timestamp header missing", {
        status: 401,
      });
    }

    const body = await request.arrayBuffer();

    const verifyResult = await ResultAsync.fromPromise(
      verify(body, signature, timestamp, publicKey),
      (e) => e,
    );
    if (verifyResult.isErr()) {
      console.error("Failed to verify request signature:", verifyResult.error);
      return new Response("Internal Server Error", { status: 500 });
    } else if (!verifyResult.value) {
      return new Response("Unauthorized", { status: 401 });
    }

    const interaction = safeJsonParse(decoder.decode(body))
      .map((v) => v as Interaction);
    if (interaction.isErr()) {
      return new Response("Bad Request", { status: 400 });
    }

    const interactionResponse = await routeInteraction(interaction.value);
    if (interactionResponse.isErr()) {
      console.error("Failed to route interaction:", interactionResponse.error);
      return new Response("Internal Server Error", { status: 500 });
    }

    console.log({
      input: interaction.value,
      output: interactionResponse.value,
    });

    const responseBody = JSON.stringify(interactionResponse.value);

    return new Response(responseBody, { status: 200 });
  },
};
