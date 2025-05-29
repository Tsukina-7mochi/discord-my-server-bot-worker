export const InteractionResponseType = {
  Pong: 1,
  ChannelMessageWithSource: 4,
} as const;

export type PongInteractionResponse = {
  type: typeof InteractionResponseType.Pong;
};

export const InteractionResponseDataMessageFlags = {
  Crossposted: 1 << 0,
  IsCrosspost: 1 << 1,
  SuppressEmbeds: 1 << 2,
  SourceMessageDeleted: 1 << 3,
  Urgent: 1 << 4,
  HasThread: 1 << 5,
  Ephemeral: 1 << 6,
  Loading: 1 << 7,
  FailedToMentionSomeRolesInThread: 1 << 8,
  SuppressNotifications: 1 << 12,
  IsVoiceMessage: 1 << 13,
  HasSnapshot: 1 << 14,
  IsComponentsV2: 1 << 15,
} as const;

export type ChannelMessageWithSourceInteractionResponse = {
  type: typeof InteractionResponseType.ChannelMessageWithSource;
  data: {
    tts?: boolean;
    content?: string;
    flags?: number;
  };
};

export type InteractionResponse =
  | PongInteractionResponse
  | ChannelMessageWithSourceInteractionResponse;
