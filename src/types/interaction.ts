import { CommandOptionType, CommandType } from "./command.ts";
import { EnumItem } from "./enum.ts";

export const InteractionType = {
  Ping: 1,
  ApplicationCommand: 2,
} as const;

export type PingInteraction = {
  type: typeof InteractionType.Ping;
};

export type ApplicationCommandInteractionDataOption = {
  name: string;
  type: EnumItem<typeof CommandOptionType>;
  value: string | number | boolean;
  options: ApplicationCommandInteractionDataOption[];
  focused?: boolean;
};

export type ApplicationCommandInteraction = {
  type: typeof InteractionType.ApplicationCommand;
  data: {
    name: string;
    type: EnumItem<typeof CommandType>;
    options?: ApplicationCommandInteractionDataOption[];
  };
};

export type Interaction = PingInteraction | ApplicationCommandInteraction;
