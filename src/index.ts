import process from "process";
import dotenv from "dotenv-flow";
import Discord, { Client, GatewayIntentBits } from "discord.js";
import CHANNELS from "./constants/channels";
import { checkAPI } from "./checkApi";

dotenv.config({
  default_node_env: "development",
  silent: true,
});

const interval = 1000; // Intervalle de vérification en millisecondes (par exemple, toutes les 60 secondes)

const main = async () => {
  try {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
      ],
    });

    const token = process.env.DISCORD_TOKEN;

    client.on("ready", () => {
      client.user?.setActivity("twitch.tv/siralex21", {
        url: "https://www.twitch.tv/siralex21",
        type: Discord.ActivityType.Streaming,
      });
      console.log(`Logged in as ${client.user?.tag}!`);
    });

    client.on("guildMemberAdd", (member) => {
      const channel = client.channels.cache.get(
        CHANNELS.PRIVATE.TEST
      ) as Discord.TextChannel;
      if (!member.user) return;
      channel?.send(`<@${member?.user.id}> a rejoint le serveur !`);
    });
    client.on("guildMemberRemove", (member) => {
      const channel = member.guild.channels.cache.get(
        CHANNELS.PRIVATE.TEST
      ) as Discord.TextChannel;
      channel.send(`${member.user.tag} a quitté le serveur !`);
    });

    client.on("messageCreate", (message) => {
      if (message.author.bot) return;
      if (message.content === "ping") message.reply("pong");
    });

    client.login(token);

    setInterval(() => {
      checkAPI(client);
    }, interval);
  } catch (error) {
    console.log(error);
  }
};

main();
