import { err, ok, Result } from "neverthrow";
import {
  CommandInit,
  CommandOptionType,
  CommandType,
} from "../types/command.ts";
import {
  ApplicationCommandInteractionDataOption,
} from "../types/interaction.ts";
import {
  InteractionResponse,
  InteractionResponseDataMessageFlags,
  InteractionResponseType,
} from "../types/interactionResponse.ts";

export const diceCommand = {
  type: CommandType.ChatInput,
  name: "dice",
  description: "Roll a dice",
  options: [
    {
      type: CommandOptionType.String,
      name: "dice",
      description: "ダイスの設定 (例: 1d6)",
      required: true,
    },
  ],
} satisfies CommandInit;

export function handleDice(
  options?: ApplicationCommandInteractionDataOption[],
): Result<InteractionResponse, unknown> {
  const dice = (options ?? []).find((option) => option.name === "dice");
  if (!dice) {
    return err("Dice option is required.");
  }

  const match = dice.value?.toString().match(/^(\d+)d(\d+)$/);
  if (!match) {
    return ok({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "有効なダイスではありません",
        flags: InteractionResponseDataMessageFlags.Ephemeral,
      },
    });
  }

  const count = parseInt(match[1]);
  const sides = parseInt(match[2]);
  if (isNaN(count) || isNaN(sides) || count <= 0 || sides <= 0) {
    return ok({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "有効なダイスではありません",
        flags: InteractionResponseDataMessageFlags.Ephemeral,
      },
    });
  }

  let result = 0;
  for (let i = 0; i < count; i++) {
    result += Math.floor(Math.random() * sides) + 1;
  }

  return ok({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `${count}d${sides} = ${result}`,
    },
  });
}
