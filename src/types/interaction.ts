export const PING_INTERACTION = 1 as const;

export type PingInteraction = {
  type: typeof PING_INTERACTION;
};

export type Interaction = PingInteraction;
export type InteractionType = Interaction["type"];
