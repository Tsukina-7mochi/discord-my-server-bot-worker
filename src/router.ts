import { Interaction, PING_INTERACTION } from "./types/interaction.ts";
import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { InteractionResponse } from "./types/interactionResponse.ts";
import { handlePing } from "./features/ping.ts";

export function routeInteraction(
  interaction: Interaction,
): ResultAsync<InteractionResponse, unknown> {
  if (interaction.type === PING_INTERACTION) {
    return okAsync(handlePing(interaction));
  }

  return errAsync(Error(`Unknown interaction type: ${interaction.type}`));
}
