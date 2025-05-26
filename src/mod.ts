import { Result, ResultAsync } from "neverthrow";
import { verifyRequestSignature } from "./verifyRequestSignature.ts";
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

    const body = await request.bytes();
    const verifyResult = await ResultAsync.fromPromise(
      verifyRequestSignature(request.headers, body, publicKey),
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

    const responseBody = JSON.stringify(interactionResponse.value);
    return new Response(responseBody, { status: 200 });
  },
};
