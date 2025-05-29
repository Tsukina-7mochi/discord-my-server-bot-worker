import { EnumItem } from "./enum.ts";

export const CommandType = {
  ChatInput: 1,
} as const;

export type CommandInit = {
  type: EnumItem<typeof CommandType>;
  name: string;
  description: string;
  options: CommandOption[];
};

export const CommandOptionType = {
  SubCommand: 1,
  SubCommandGroup: 2,
  String: 3,
  Integer: 4,
  Boolean: 5,
  User: 6,
  Channel: 7,
  Role: 8,
  Mentionable: 9,
  Number: 10,
  Attachment: 11,
} as const;

export type CommandOption = {
  type: EnumItem<typeof CommandOptionType>;
  name: string;
  description: string;
  required?: boolean;
  choices?: { name: string; value: string | number }[];
  options?: CommandOption[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
};
