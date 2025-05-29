import { PingInteraction } from "../types/interaction.ts";
import {
  InteractionResponseType,
  PongInteractionResponse,
} from "../types/interactionResponse.ts";

export function handlePing(_: PingInteraction): PongInteractionResponse {
  return { type: InteractionResponseType.Pong };
}
