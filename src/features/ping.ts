import { PingInteraction } from "../types/interaction.ts";
import {
  PONG_INTERACTION_RESPONSE,
  PongInteractionResponse,
} from "../types/interactionResponse.ts";

export function handlePing(_: PingInteraction): PongInteractionResponse {
  return { type: PONG_INTERACTION_RESPONSE };
}
