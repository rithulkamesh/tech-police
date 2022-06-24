import 'dotenv/config';
import { DEV_MODE, TEST_GUILD_ID } from './config';
import { JellyCommands } from 'jellycommands';
import { Intents } from 'discord.js';
import healthcheck from './healthcheck';

const client = new JellyCommands({
  commands: 'src/commands',
  events: 'src/events',

  clientOptions: {
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  },

  dev: {
    global: DEV_MODE,

    // If we set dev to true in a command it disabled global and adds it to the guilds bellow
    guilds: [TEST_GUILD_ID],
  },

  // we can disable this but I like to see the debug messages xD - GHOST
  debug: true,

  // This should hopefully fix the issues in production
  cache: DEV_MODE,
});

// Auto reads the DISCORD_TOKEN environment variable
client.login();

healthcheck
