export const DEV_MODE = process.env.NODE_ENV !== 'production';

export const TEST_GUILD_ID = DEV_MODE
  ? process.env.DEV_GUILD_ID
  : '982711881980588133';

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

export const TAURI_BLUE = 0x67d6ed;

// people
const ADMIN_ROLES = DEV_MODE
  ? [process.env.DEV_ADMIN_ROLE]
  : [
    // Admin
    "982720536847192134",
    // Cult Leader,
    "982721110858674246"
  ];

export const BOT_DEVS = [
  // rithulkamesh#2924
  "706529084662087690"
];


//  list of roles/user IDs other than the creator allowed to modify threads
export const THREAD_ADMIN_IDS = [...ADMIN_ROLES, ...BOT_DEVS];

// channels
export const HELP_CHANNELS = DEV_MODE
  ? [process.env.DEV_HELP_CHANNEL]
  : [
    // #development-help
    "987022775732551700"
  ];

// channels that will be automatically threaded when a message is created
export const AUTO_THREAD_CHANNELS = [...HELP_CHANNELS];
