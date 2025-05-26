export const PONG_INTERACTION_RESPONSE = 1 as const;

export type PongInteractionResponse = {
  type: typeof PONG_INTERACTION_RESPONSE;
};

export type InteractionResponse = PongInteractionResponse;
export type InteractionCallbackType = InteractionResponse["type"];
