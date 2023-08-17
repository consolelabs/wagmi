// Notion
// required
export const NOTION_KEY = process.env.NOTION_TOKEN as string
export const NOTION_DB_ID_WAGMI = process.env.NOTION_DB_ID_WAGMI as string

export const DISCORD_LINK =
  process.env.DISCORD_LINK || 'https://discord.gg/qfgEXWgZUj'
export const TWITTER_LINK =
  process.env.TWITTER_LINK || 'https://twitter.com/mochi_gg_'
export const GITBOOK_LINK =
  process.env.GITBOOK_LINK ||
  'https://mochibot.gitbook.io/mochi-bot/introduction/about-mochi-bot'
export const TELEGRAM_LINK = process.env.TELEGRAM_LINK || ''

export const HOME_URL =
  process.env.NEXT_PUBLIC_HOME_URL || 'https://wagmi.console.so'

export const CONSOLE_LABS_HOME_URL =
  process.env.NEXT_PUBLIC_HOME_URL || 'https://console.so'
