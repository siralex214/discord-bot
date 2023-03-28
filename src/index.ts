import process from "process";
import dotenv from "dotenv-flow";
import Discord from "discord.js";

dotenv.config({
  default_node_env: "development",
  silent: true,
});

const main = async () => {
  const client = new Discord.Client({
    intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.GuildMessageReactions,
      Discord.GatewayIntentBits.MessageContent,
    ],
  });
  const token = process.env.DISCORD_TOKEN;

  client.login(token);

  client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on("guildMemberAdd", (member) => {
    console.log(`${member.user.tag} has joined the server!`);
  });
};

main();
