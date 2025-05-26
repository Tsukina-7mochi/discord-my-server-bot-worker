import server from "./src/mod.ts";

const env = Deno.env.toObject();

export default {
  fetch(req: Request) {
    return server.fetch(req, env, null);
  },
};
