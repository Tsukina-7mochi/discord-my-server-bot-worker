import { Interaction, InteractionType } from "./types/interaction.ts";
import { err, ok, Result, ResultAsync } from "neverthrow";
import { InteractionResponse } from "./types/interactionResponse.ts";
import { handlePing } from "./features/ping.ts";
import { diceCommand, handleDice } from "./features/dice.ts";
import { CommandType } from "./types/command.ts";

type ResultOrAsync<T, E> = Result<T, E> | ResultAsync<T, E>;

export function routeInteraction(
  interaction: Interaction,
): ResultOrAsync<InteractionResponse, unknown> {
  if (interaction.type === InteractionType.Ping) {
    return ok(handlePing(interaction));
  } else if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.type === CommandType.ChatInput) {
      if (interaction.data.name === diceCommand.name) {
        return handleDice(interaction.data.options);
      }
    }
  }

  return err(Error(`Unknown interaction type: ${interaction.type}`));
}
