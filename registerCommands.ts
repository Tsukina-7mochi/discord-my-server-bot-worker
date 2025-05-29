import { diceCommand } from "./src/features/dice.ts";

const guildId = "854228542811537425";

const applicationId = Deno.env.get("APPLICATION_ID");
if (!applicationId) {
  throw new Error("APPLICATION_ID environment variable is not set");
}

const botToken = Deno.env.get("BOT_TOKEN");
if (!botToken) {
  throw new Error("BOT_TOKEN environment variable is not set");
}

// deno-fmt-ignore
const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`;
const headers = {
  "User-Agent": "DiscordBot (full-scratch, 0.1.0)",
  Authorization: `Bot ${botToken}`,
  "Content-Type": "application/json",
} satisfies HeadersInit;

const commands = [diceCommand];
const encoder = new TextEncoder();

for (const command of commands) {
  await Deno.stdout.write(
    encoder.encode(`Registering command: ${command.name}...`),
  );
  const res = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(diceCommand),
  });

  if (!res.ok) {
    const errorText = await res.text();
    await Deno.stdout.write(encoder.encode(
      `failed (${res.status})\nResponce: ${errorText}\n`,
    ));
  } else {
    const body = await res.json();
    await Deno.stdout.write(encoder.encode(
      `success (ID: ${body.id})\n`,
    ));
  }
}
